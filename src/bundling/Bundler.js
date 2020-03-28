// inboxy: Chrome extension for Google Inbox-style bundles in Gmail.
// Copyright (C) 2020  Teresa Ou

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import Bundle from '../containers/Bundle';

import BundleRow from '../components/BundleRow';
import DateDivider from '../components/DateDivider';

import QuickSelectHandler from '../handlers/QuickSelectHandler';
import MessageSelectHandler from '../handlers/MessageSelectHandler';

import InboxyStyler from './InboxyStyler';

import { 
    getCurrentPageNumber, 
    getCurrentBaseUrl,
} from '../util/MessagePageUtils';
import { 
    GmailClasses,
    InboxyClasses,
    Selectors, 
    TableBodySelectors,
    ORDER_INCREMENT, 
} from '../util/Constants';
import DomUtils from '../util/DomUtils';

const Element = {
    DATE_DIVIDER: 1,
    BUNDLE: 2,
    UNBUNDLED_MESSAGE: 3,
};

/**
 * Groups messages into bundles, and renders those bundles.
 */
class Bundler {
    constructor(bundleToggler, bundledMail, messageListWatcher) {
        this.bundleToggler = bundleToggler;
        this.bundledMail = bundledMail;
        this.messageListWatcher = messageListWatcher;
        this.messageSelectHandler = new MessageSelectHandler(bundledMail);
        this.inboxyStyler = new InboxyStyler(bundledMail);
        this.quickSelectHandler = new QuickSelectHandler();
    }

    /**
     * Bundle together the messages on the current page of messages, if they aren't already bundled,
     * optionally reopening the most recently open bundle.
     */
    bundleMessages(reopenRecentBundle) {
        const bundledMail = this.bundledMail;
        const possibleMessageLists = document.querySelectorAll(Selectors.POSSIBLE_MESSAGE_LISTS);
        const messageList = possibleMessageLists.length ? possibleMessageLists.item(1) : null;

        if (!messageList) {
            return;
        }
        
        this.messageListWatcher.disconnect();

        // Only redraw if message list isn't still bundled
        if (!messageList.children[0].classList.contains('is-bundled')) {
            this._bundleMessages(messageList);
            messageList.children[0].classList.add('is-bundled');
        }

        // Either reopen the bundle that was open, or close all bundles
        if (reopenRecentBundle && bundledMail.getBundle(bundledMail.getLabelOfOpenedBundle())) {
            this.bundleToggler.openBundle(bundledMail.getLabelOfOpenedBundle());
        }
        else {
            bundledMail.closeBundle();
        }

        this.messageListWatcher.observe();
    }

    /**
     * Bundle messages in the given messageList dom node.
     *
     * Table rows are reordered by using flexbox and the order property, since Gmail's js seems 
     * to require the DOM nodes to remain in their original order. 
     */
    _bundleMessages(messageList) {
        const tableBody = messageList.querySelector(Selectors.TABLE_BODY);

        document.querySelector('body').classList.add(InboxyClasses.INBOXY);
        tableBody.classList.add('flex-table-body');

        const messageNodes = [...tableBody.querySelectorAll(TableBodySelectors.MESSAGE_NODES)];

        const bundlesByLabel = this._groupByLabel(messageNodes);
        const sortedTableRows = this._calculateSortedTableRows(messageNodes, bundlesByLabel);
        
        const bundleRowsByLabel = this._drawTableRows(sortedTableRows, tableBody);
        this._drawBundleBox(tableBody);

        Object.entries(bundleRowsByLabel).forEach(([label, bundleRow]) => {
            const bundle = bundlesByLabel[label];
            bundle.setBundleRow(bundleRow);
            bundle.setOrder(parseInt(bundleRow.style.order));
        });

        this.bundledMail.setBundles(bundlesByLabel, getCurrentPageNumber());

        this._applyStyles(messageNodes);
        this._attachHandlers(messageNodes, messageList);
    }

    /**
     * Group messages by their labels.
     * Returns a map of labels to bundles.
     */
    _groupByLabel(messageNodes) {
        const bundlesByLabel = {};

        messageNodes.forEach(message => {
            const messageLabels = DomUtils.getLabelStrings(message);

            if (!this._isStarred(message)) {
                messageLabels.forEach(l => {
                    if (!bundlesByLabel[l]) {
                        const bundle = new Bundle(l);
                        bundlesByLabel[l] = bundle;
                    }

                    bundlesByLabel[l].addMessage(message);
                });
            }
        })

        return bundlesByLabel;
    }

    /**
     * Returns a list of elements that will be shown in the message list,
     * in the same order they will be displayed.
     * 
     * Each item is an object with 'element' and 'type' fields. They can be
     * a message row, date divider, or bundle row.
     */
    _calculateSortedTableRows(messageNodes, bundlesByLabel) {
        const rows = this._calculateMessageAndBundleRows(messageNodes, bundlesByLabel);

        const sampleDate = messageNodes.length 
            ? DomUtils.extractDate(messageNodes[0])
            : '';

        return this._insertDateDividers(rows, sampleDate);
    }

    _calculateMessageAndBundleRows(messageNodes, bundlesByLabel) {
        const rows = [];
        const labels = new Set();

        for (let i = 0; i < messageNodes.length; i++) {
            const message = messageNodes[i];
            const messageLabels = DomUtils.getLabelStrings(message);

            if (messageLabels.length === 0 || this._isStarred(message)) {
                rows.push({
                    element: message,
                    type: Element.UNBUNDLED_MESSAGE,
                });
                continue;
            }

            messageLabels.forEach(l => {
                if (!labels.has(l) && bundlesByLabel[l]) {
                    rows.push({
                        element: bundlesByLabel[l],
                        type: Element.BUNDLE,
                    });
                    labels.add(l);
                }
            });
        }

        return rows;
    }

    /**
     * Inserts date dividers between the given rows, and returns the 
     * modified list of rows with date divider rows.
     */
    _insertDateDividers(messagesAndBundleRows, sampleDate) {
        const rows = [];
        
        let dateDividers = DateDivider.getDateDividers(sampleDate, new Date());
        let prevRow = null;
        for (let i = 0; i < messagesAndBundleRows.length; i++) {
            const currRow = messagesAndBundleRows[i];
            const divider = DateDivider.shouldInsertDateDivider(
                this._getLatestMessage(prevRow), this._getLatestMessage(currRow), dateDividers);
            if (divider) {
                rows.push({
                    element: divider,
                    type: Element.DATE_DIVIDER,
                });                   
            }

            rows.push(currRow);
            prevRow = currRow;
        }

        return rows;
    }

    /**
     * Return the most recent message associated with the given table row.
     */
    _getLatestMessage(tableRow) {
        if (!tableRow) {
            return null;
        }

        switch (tableRow.type) {
            case Element.BUNDLE:
                const bundle = tableRow.element;
                return bundle.getMessages()[0];
            case Element.UNBUNDLED_MESSAGE:
                return tableRow.element;
            default:
                throw `Unhandled element type: ${e.type}`;
        }   
    }

    /** 
     * Draw/append the table rows to the tableBody, and set their visual order.
     * 
     * Returns a map of newly created bundle rows by label.
     */
    _drawTableRows(tableRows, tableBody) {
        const baseUrl = getCurrentBaseUrl();
        const bundleRowsByLabel = {};
        tableRows.forEach((e, i) => {
            const order = (i + 1) * ORDER_INCREMENT;
            switch (e.type) {
                case Element.DATE_DIVIDER:
                    this._drawDateDivider(e.element, order, tableBody);
                    break;
                case Element.BUNDLE:
                    const bundle = e.element;
                    const bundleRow = this._drawBundleRow(bundle, order, tableBody, baseUrl);
                    bundleRowsByLabel[bundle.getLabel()] = bundleRow;
                    break;
                case Element.UNBUNDLED_MESSAGE:
                    e.element.style.order = order;
                    break;
                default:
                    throw `Unhandled element type: ${e.type}`;
            }
        });

        return bundleRowsByLabel;
    }

    _drawBundleBox(tableBody) {
        const bundleBox = DomUtils.htmlToElement('<div class="bundle-area"></div>'); 
        bundleBox.addEventListener(
            'click', 
            () => this.bundleToggler.closeAllBundles());
        tableBody.appendChild(bundleBox);
    }

    /**
     * Create a date divider element and append it to the tableBody.
     */
    _drawDateDivider(divider, order, tableBody) {
        const dividerNode = DateDivider.create(divider, order);
        tableBody.append(dividerNode);
    }

    /**
     * Create a bundle row element and append it to the tableBody.
     */
    _drawBundleRow(bundle, order, tableBody, baseUrl) {
        const messages = bundle.getMessages();
        const hasUnreadMessages = messages.some(this._isUnreadMessage);

        const bundleRow = BundleRow.create(
            bundle.getLabel(), 
            order, 
            messages.length,
            hasUnreadMessages, 
            this.bundleToggler.toggleBundle,
            baseUrl);
        tableBody.appendChild(bundleRow);

        messages.forEach(m => m.classList.add(InboxyClasses.BUNDLED_MESSAGE));

        return bundleRow;
    }

    _isUnreadMessage(message) {
        return message.classList.contains(GmailClasses.UNREAD);
    }

    _isStarred(message) {
        return message.querySelector(`.${GmailClasses.STARRED}`);
    }

    _applyStyles(messageNodes) {
        this.inboxyStyler.markSelectedBundles();
        this.inboxyStyler.disableBulkArchiveIfNecessary();
    }

    _attachHandlers(messageNodes, messageList) {
        // Ensure shift+click selection works
        document.querySelectorAll(Selectors.CHECKBOXES)
            .forEach(
                n => n.addEventListener('click', this.quickSelectHandler.handleCheckboxClick));

        // Close bundles when clicking outside of any open bundle
        messageList.addEventListener('click', e => {
            if (!e.target.closest('tr')) {
                this.bundleToggler.closeAllBundles();
            }
        });

        this.messageSelectHandler.startWatching(messageNodes);
    }
}

export default Bundler;