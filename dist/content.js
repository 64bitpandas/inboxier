/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bundling/BundleToggler.js":
/*!***************************************!*\
  !*** ./src/bundling/BundleToggler.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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




/**
 * Opens/closes bundles to show/hide bundled messages.
 */
class BundleToggler {
    constructor(bundledMail) {
        this.bundledMail = bundledMail;
        
        this.toggleBundle = this.toggleBundle.bind(this);
        this.openBundle = this.openBundle.bind(this);
        this.closeAllBundles = this.closeAllBundles.bind(this);
    }

    toggleBundle(label) {
        const openedBundleLabel = this.bundledMail.getLabelOfOpenedBundle();

        if (openedBundleLabel) {
            this.closeAllBundles();
        }

        if (openedBundleLabel !== label) {
            this.openBundle(label);
        }
    }

    openBundle(label) {
        this.bundledMail.openBundle(label);
        const bundle = this.bundledMail.getBundle(label);

        // Set order for bundled messages and make them visible
        const messages = bundle.getMessages();
        messages.forEach((el, i) => {
            el.style.order = bundle.getOrder() + i + 1;
            el.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].VISIBLE);

            if (i === messages.length - 1) {
                el.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].LAST);
            }

            // Hide redundant labels
            el.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["Selectors"].LABEL_CONTAINERS).forEach(lc => {
                if (lc.childNodes[0].title === label) {
                    lc.style.display = 'none';
                }
            });
        });

        const bundleRow = bundle.getBundleRow();
        bundleRow.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].VISIBLE);
        // Remove top margin when bundle row follows a date divider
        if (bundleRow.previousSibling && 
            bundleRow.previousSibling.classList.contains('date-row') &&
            bundle.getOrder() - bundleRow.previousSibling.style.order <= _util_Constants__WEBPACK_IMPORTED_MODULE_1__["ORDER_INCREMENT"])
        {
            bundleRow.style.marginTop = '0';
        }

        this._showBundleArea(bundle);
    }

    closeAllBundles() {
        const openedBundleLabel = this.bundledMail.getLabelOfOpenedBundle();
        if (!openedBundleLabel) {
            return;
        }

        this.bundledMail.closeBundle();

        // Remove styles that were added when the bundle was opened
        document.querySelectorAll(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].BUNDLED_MESSAGE}.${_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].VISIBLE}`)
            .forEach(el => {
                el.style.order = '';
                el.classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].VISIBLE);
                el.classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].LAST);

                // Unhide labels
                el.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["Selectors"].LABEL_CONTAINERS).forEach(lc => {
                    if (lc.style.display) {
                        lc.style.display = '';
                    }
                });
            });

        document.querySelectorAll(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].BUNDLE_ROW}.${_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].VISIBLE}`)
            .forEach(el => {
                el.classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["InboxyClasses"].VISIBLE);
                el.style.marginTop = '';
            });        

        document.querySelectorAll('.bundle-area')
            .forEach(bundleArea => bundleArea.style.display = '');
    }

    _showBundleArea(bundle) {
        const bundleArea = document.querySelector(`${_util_Constants__WEBPACK_IMPORTED_MODULE_1__["Selectors"].CURRENT_TABPANEL} .bundle-area`);
        bundleArea.style.display = 'block';

        const top = BundleToggler._calculateBundleAreaTop(bundle.getBundleRow());
        bundleArea.style.top = `${top}px`;
        
        const height = BundleToggler._calculateBundleAreaHeight(bundle.getMessages());
        bundleArea.style.height = `${height}px`;
    }

    static _calculateBundleAreaTop(bundleRow) {
        return bundleRow.offsetTop + bundleRow.offsetHeight;
    }

    static _calculateBundleAreaHeight(messages) {
        return (messages[messages.length - 1].offsetTop - messages[0].offsetTop) + 
            messages[messages.length - 1].offsetHeight;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (BundleToggler);

/***/ }),

/***/ "./src/bundling/Bundler.js":
/*!*********************************!*\
  !*** ./src/bundling/Bundler.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers_Bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../containers/Bundle */ "./src/containers/Bundle.js");
/* harmony import */ var _components_BundleRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/BundleRow */ "./src/components/BundleRow.js");
/* harmony import */ var _components_DateDivider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/DateDivider */ "./src/components/DateDivider.js");
/* harmony import */ var _handlers_QuickSelectHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../handlers/QuickSelectHandler */ "./src/handlers/QuickSelectHandler.js");
/* harmony import */ var _handlers_MessageSelectHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../handlers/MessageSelectHandler */ "./src/handlers/MessageSelectHandler.js");
/* harmony import */ var _InboxyStyler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InboxyStyler */ "./src/bundling/InboxyStyler.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
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















/**
 * Groups messages into bundles, and renders those bundles.
 */
class Bundler {
    constructor(bundleToggler, bundledMail, messageListWatcher, selectiveBundling) {
        this.bundleToggler = bundleToggler;
        this.bundledMail = bundledMail;
        this.messageListWatcher = messageListWatcher;
        this.selectiveBundling = selectiveBundling;
        this.messageSelectHandler = new _handlers_MessageSelectHandler__WEBPACK_IMPORTED_MODULE_4__["default"](bundledMail, selectiveBundling);
        this.inboxyStyler = new _InboxyStyler__WEBPACK_IMPORTED_MODULE_5__["default"](bundledMail);
        this.quickSelectHandler = new _handlers_QuickSelectHandler__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }

    /**
     * Bundle together the messages on the current page of messages, if they aren't already bundled,
     * optionally reopening the most recently open bundle.
     */
    bundleMessages(reopenRecentBundle) {
        const bundledMail = this.bundledMail;
        const possibleMessageLists = document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["Selectors"].POSSIBLE_MESSAGE_LISTS);
        const messageList = possibleMessageLists.length 
            ? possibleMessageLists.item(possibleMessageLists.length - 1) 
            : null;

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
        const tableBody = messageList.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["Selectors"].TABLE_BODY);

        document.querySelector('html').classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["InboxyClasses"].INBOXY);
        tableBody.classList.add('flex-table-body');

        const messageNodes = [...tableBody.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["TableBodySelectors"].MESSAGE_NODES)];

        const bundlesByLabel = this._groupByLabel(messageNodes);
        const sortedTableRows = this._calculateSortedTableRows(messageNodes, bundlesByLabel);
        
        const bundleRowsByLabel = this._drawTableRows(sortedTableRows, tableBody);
        this._drawBundleBox(tableBody);

        Object.entries(bundleRowsByLabel).forEach(([label, bundleRow]) => {
            const bundle = bundlesByLabel[label];
            bundle.setBundleRow(bundleRow);
            bundle.setOrder(parseInt(bundleRow.style.order));
        });

        this.bundledMail.setBundles(bundlesByLabel, Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_6__["getCurrentPageNumber"])());

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
            const messageLabels = this.selectiveBundling.filter(_util_DomUtils__WEBPACK_IMPORTED_MODULE_8__["default"].getLabels(message));

            if (!this._isStarred(message)) {
                messageLabels.forEach(l => {
                    const t = l.title;
                    const leaf = l.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["Selectors"].LABEL_LEAF);
                    const labelStyle = Object.assign(
                        _util_DomUtils__WEBPACK_IMPORTED_MODULE_8__["default"].getCSS(l, "background", "background-color", "font-family", "border"),
                        _util_DomUtils__WEBPACK_IMPORTED_MODULE_8__["default"].getCSS(leaf, "border-radius", "color", "padding")
                    );

                    if (!bundlesByLabel[t]) {
                        bundlesByLabel[t] = new _containers_Bundle__WEBPACK_IMPORTED_MODULE_0__["default"](t, labelStyle);
                    }

                    bundlesByLabel[t].addMessage(message);
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
            ? _util_DomUtils__WEBPACK_IMPORTED_MODULE_8__["default"].extractDate(messageNodes[0])
            : '';

        return _components_DateDivider__WEBPACK_IMPORTED_MODULE_2__["default"].withDateDividers(rows, sampleDate, this._getLatestMessage);
    }

    _calculateMessageAndBundleRows(messageNodes, bundlesByLabel) {
        const rows = [];
        const labels = new Set();

        for (let i = 0; i < messageNodes.length; i++) {
            const message = messageNodes[i];
            const messageLabels = this.selectiveBundling.filter(_util_DomUtils__WEBPACK_IMPORTED_MODULE_8__["default"].getLabels(message));

            if (messageLabels.length === 0 || this._isStarred(message)) {
                rows.push({
                    element: message,
                    type: _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].UNBUNDLED_MESSAGE,
                });
                continue;
            }

            messageLabels.forEach(l => {
                l = l.title;
                if (!labels.has(l) && bundlesByLabel[l]) {
                    rows.push({
                        element: bundlesByLabel[l],
                        type: _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].BUNDLE,
                    });
                    labels.add(l);
                }
            });
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
            case _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].BUNDLE:
                const bundle = tableRow.element;
                return bundle.getMessages()[0];
            case _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].UNBUNDLED_MESSAGE:
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
        const baseUrl = Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_6__["getCurrentBaseUrl"])();
        const bundleRowsByLabel = {};
        tableRows.forEach((e, i) => {
            const order = (i + 1) * _util_Constants__WEBPACK_IMPORTED_MODULE_7__["ORDER_INCREMENT"];
            switch (e.type) {
                case _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].DATE_DIVIDER:
                    const messages = _components_DateDivider__WEBPACK_IMPORTED_MODULE_2__["default"].findMessagesForDivider(tableRows, i);
                    this._drawDateDivider(e.element, order, messages, tableBody);
                    break;
                case _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].BUNDLE:
                    const bundle = e.element;
                    const bundleRow = this._drawBundleRow(bundle, order, tableBody, baseUrl);
                    bundleRowsByLabel[bundle.getLabel()] = bundleRow;
                    break;
                case _util_Constants__WEBPACK_IMPORTED_MODULE_7__["Element"].UNBUNDLED_MESSAGE:
                    e.element.style.order = order;
                    break;
                default:
                    throw `Unhandled element type: ${e.type}`;
            }
        });

        return bundleRowsByLabel;
    }

    _drawBundleBox(tableBody) {
        const bundleBox = _util_DomUtils__WEBPACK_IMPORTED_MODULE_8__["default"].htmlToElement('<div class="bundle-area"></div>'); 
        bundleBox.addEventListener(
            'click', 
            () => this.bundleToggler.closeAllBundles());
        tableBody.appendChild(bundleBox);
    }

    /**
     * Create a date divider element and append it to the tableBody.
     */
    _drawDateDivider(divider, order, messages, tableBody) {
        const dividerNode = _components_DateDivider__WEBPACK_IMPORTED_MODULE_2__["default"].create(divider, order, messages);
        tableBody.append(dividerNode);
    }

    /**
     * Create a bundle row element and append it to the tableBody.
     */
    _drawBundleRow(bundle, order, tableBody, baseUrl) {
        const messages = bundle.getMessages();
        const hasUnreadMessages = messages.some(this._isUnreadMessage);

        const bundleRow = _components_BundleRow__WEBPACK_IMPORTED_MODULE_1__["default"].create(
            bundle.getLabel(), 
            bundle.getStyle(),
            order, 
            messages,
            hasUnreadMessages, 
            this.bundleToggler.toggleBundle,
            baseUrl);
        tableBody.appendChild(bundleRow);

        messages.forEach(m => m.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["InboxyClasses"].BUNDLED_MESSAGE));

        return bundleRow;
    }

    _isUnreadMessage(message) {
        return message.classList.contains(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["GmailClasses"].UNREAD);
    }

    _isStarred(message) {
        return message.querySelector(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_7__["GmailClasses"].STARRED}`);
    }

    _applyStyles(messageNodes) {
        this.inboxyStyler.markSelectedBundles();
        this.inboxyStyler.disableBulkArchiveIfNecessary();
    }

    _attachHandlers(messageNodes, messageList) {
        // Ensure shift+click selection works
        document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_7__["Selectors"].CHECKBOXES)
            .forEach(
                n => n.addEventListener('click', this.quickSelectHandler.handleCheckboxClick));

        // Close bundles when clicking outside of any open bundle
        messageList.addEventListener('click', e => {
            // #63 - e.target may have been removed before event propagates to messageList
            if (document.body.contains(e.target) && !e.target.closest('tr')) {
                this.bundleToggler.closeAllBundles();
            }
        });

        this.messageSelectHandler.startWatching(messageNodes);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Bundler);


/***/ }),

/***/ "./src/bundling/DateGrouper.js":
/*!*************************************!*\
  !*** ./src/bundling/DateGrouper.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_DateDivider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/DateDivider */ "./src/components/DateDivider.js");
/* harmony import */ var _handlers_PinnedMessageListWatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../handlers/PinnedMessageListWatcher */ "./src/handlers/PinnedMessageListWatcher.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
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








/**
 * Adds date dividers to a message list. 
 *
 * Many parts of the implementation are similar to Bundler.js, with some slight differences.
 */
class DateGrouper {
    constructor() {
        this.refreshDateDividers = this.refreshDateDividers.bind(this);

        this.pinnedMessageListWatcher = new _handlers_PinnedMessageListWatcher__WEBPACK_IMPORTED_MODULE_1__["default"](this.refreshDateDividers);
    }

    /** 
     * Insert date dividers onto the current displayed message list.
     */
    refreshDateDividers() {
        const possibleMessageLists = document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_2__["Selectors"].POSSIBLE_MESSAGE_LISTS);
        const messageList = possibleMessageLists.length ? possibleMessageLists.item(1) : null;

        if (!messageList) {
            return;
        }

        this.pinnedMessageListWatcher.disconnect();

        this._refreshDateDividers(messageList);
        this._hideInboxLabels(messageList);
        
        this.pinnedMessageListWatcher.observe();
    }

    _refreshDateDividers(messageList) {
        const tableBody = messageList.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_2__["Selectors"].TABLE_BODY);

        document.querySelector('html').classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_2__["InboxyClasses"].INBOXY);
        tableBody.classList.add('flex-table-body');

        // Remove all pre-existing date rows
        tableBody.querySelectorAll('.date-row').forEach(n => n.remove());

        const messageNodes = [...tableBody.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_2__["TableBodySelectors"].MESSAGE_NODES)];

        const sampleDate = messageNodes.length 
            ? _util_DomUtils__WEBPACK_IMPORTED_MODULE_3__["default"].extractDate(messageNodes[0])
            : '';

        const messageRows = messageNodes.map(m => ({
            element: m,
            type: _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].UNBUNDLED_MESSAGE,
        }));
        const rows = _components_DateDivider__WEBPACK_IMPORTED_MODULE_0__["default"].withDateDividers(messageRows, sampleDate);
        this._drawRows(rows, tableBody);
    }

    /**
     * Add date dividers to the page, and set order numbers for date dividers and messages.
     */
    _drawRows(tableRows, tableBody) {
        tableRows.forEach((e, i) => {
            switch (e.type) {
                case _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].DATE_DIVIDER:
                    const messages = _components_DateDivider__WEBPACK_IMPORTED_MODULE_0__["default"].findMessagesForDivider(tableRows, i);
                    const dividerNode = _components_DateDivider__WEBPACK_IMPORTED_MODULE_0__["default"].create(e.element, i, messages);
                    tableBody.append(dividerNode)
                    break;
                case _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].UNBUNDLED_MESSAGE:
                    e.element.style.order = i;
                    break;
                default:
                    throw `Unhandled element type: ${e.type}`;
            }
        });
    }

    _hideInboxLabels(messageList) {
        messageList.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_2__["Selectors"].INBOX_LABEL)
            .forEach(l => l.parentNode.style.display = 'none');
    }
} 

/* harmony default export */ __webpack_exports__["default"] = (DateGrouper);

/***/ }),

/***/ "./src/bundling/InboxyStyler.js":
/*!**************************************!*\
  !*** ./src/bundling/InboxyStyler.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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



/**
 * Applies inboxy styling.
 */
class InboxyStyler {
    constructor(bundledMail) {
        this.bundledMail = bundledMail;
    }

    /**
     * Apply "selected" styling (i.e. checked) to all bundles that have any messages that
     * are selected.
     */
    markSelectedBundles() {
        Object.values(this.bundledMail.getAllBundles()).forEach(this._markSelectedBundle);
    }

    /**
     * Apply "selected" styling (i.e. checked) to all bundles with the given labels, that have
     * any messages that are selected.
     */
    markSelectedBundlesFor(labels) {
        labels.forEach(l => {
            const bundle = this.bundledMail.getBundle(l);
            if (!bundle) {
                return;
            }

            this._markSelectedBundle(bundle);
        });
    }

    /**
     * Apply "selected" styling to the bundle.
     */
    _markSelectedBundle(bundle) {
        const hasSelectedMessages = bundle.getMessages()
            .some(m => m.classList.contains(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["GmailClasses"].SELECTED));

        if (hasSelectedMessages) {
            bundle.getBundleRow().classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["GmailClasses"].SELECTED);
        }
        else {
            bundle.getBundleRow().classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["GmailClasses"].SELECTED);
        }
    }

    /**
     * For each bundle, disable bulk-archiving if any message outside of its bundle is selected.
     */
    disableBulkArchiveIfNecessary() {
        const selectedMessages = [].slice.call(
            document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].SELECTED));
        Object.values(this.bundledMail.getAllBundles()).forEach(bundle => 
            this._updateBulkArchiveButton(bundle, selectedMessages));
    }

    /**
     * Enable/disable the bulk archive button for the given bundle.
     */
    _updateBulkArchiveButton(bundle, selectedMessages) {
        const bundledMessageIds = new Set(bundle.getMessages().map(m => m.id));
        const allSelectedMessagesInBundle = !selectedMessages.some(
            m => !bundledMessageIds.has(m.id));

        const bulkArchiveButton = bundle.getBundleRow().querySelector('.archive-bundle');
        if (allSelectedMessagesInBundle) {
            bulkArchiveButton.classList.remove('disabled');
        }
        else {
            bulkArchiveButton.classList.add('disabled');
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (InboxyStyler);

/***/ }),

/***/ "./src/bundling/SelectiveBundling.js":
/*!*******************************************!*\
  !*** ./src/bundling/SelectiveBundling.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/**
 * Identifies the labels that have bundling enabled, according to the user's options.
 * By default, all labels are bundled.
 */
class SelectiveBundling {
    constructor() {
        const self = this;
        chrome.storage.sync.get(['exclude', 'labels'], ({ exclude = true, labels = [] }) => {
            self.exclude = exclude;
            self.labels = new Set(labels.map(s => s.toLowerCase()));
        });
    }

    filter(messageLabels) {
        if (this.exclude) {
            return messageLabels.filter(l => !this.labels.has(l.title.toLowerCase()));
        }
        else {
            return messageLabels.filter(l => this.labels.has(l.title.toLowerCase()));
        }
    }

    filterStrings(messageLabels) {
        return this.filter(messageLabels).map(l => l.title);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (SelectiveBundling);


/***/ }),

/***/ "./src/components/BulkArchiveButton.js":
/*!*********************************************!*\
  !*** ./src/components/BulkArchiveButton.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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




/**
 * Create bulk archive button for archiving the given messages, which should be in the same bundle.
 */
function create(messages) {
    return _create(() => _selectMessages(messages));
}

function _create(selectMessagesFunction) {
    const html = `
        <span class="archive-bundle ${_util_Constants__WEBPACK_IMPORTED_MODULE_1__["GmailClasses"].ARCHIVE_BUTTON}">
        </span>
    `;

    const archiveSpan = _util_DomUtils__WEBPACK_IMPORTED_MODULE_0__["default"].htmlToElement(html);
    archiveSpan.addEventListener('click', e =>  {
        if (archiveSpan.classList.contains('disabled')) {
            e.stopPropagation();
            return;
        }

        _archiveMessages(selectMessagesFunction);
        e.stopPropagation();
    });

    return archiveSpan;
}

function _archiveMessages(selectMessagesFunction) {
    const toolbarArchiveButton = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["Selectors"].TOOLBAR_ARCHIVE_BUTTON);

    const buttonIsVisible = new Promise((resolve, reject) => {
        const observer = new MutationObserver((mutation, observer) => {
            if (_isClickable(toolbarArchiveButton)) {
                observer.disconnect();
                resolve();
            }
        });
        observer.observe(
            toolbarArchiveButton.parentNode, 
            { attributes: true, childList: false, subtree: true });
    });

    const selectMessages = new Promise((resolve, reject) => {
        selectMessagesFunction();
        resolve();
    });

    Promise.all([buttonIsVisible, selectMessages]).then(() => _simulateClick(toolbarArchiveButton));
}

/**
 * Select all given messages.
 */
function _selectMessages(messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
        const checkboxNode = messages[i].querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_1__["Selectors"].MESSAGE_CHECKBOX);
        if (!_util_DomUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isChecked(checkboxNode)) {
            checkboxNode.click();
        }
    }
}

function _isClickable(button) {
    return getComputedStyle(button.parentNode).display !== 'none' && 
        button.getAttribute('aria-disabled') !== 'true';
}

function _simulateClick(element) {
    const dispatchMouseEvent = function(target, name) {
        const e = new MouseEvent(name, {
            view: window,
            bubbles: true,
            cancelable: true,
          });
        target.dispatchEvent(e);
    };
    dispatchMouseEvent(element, 'mouseover');
    dispatchMouseEvent(element, 'mousedown');
    dispatchMouseEvent(element, 'click');
    dispatchMouseEvent(element, 'mouseup');
}

/* harmony default export */ __webpack_exports__["default"] = ({ create });

/***/ }),

/***/ "./src/components/BundleRow.js":
/*!*************************************!*\
  !*** ./src/components/BundleRow.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BulkArchiveButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BulkArchiveButton */ "./src/components/BulkArchiveButton.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _containers_Color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/Color */ "./src/containers/Color.js");
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









const MAX_MESSAGE_COUNT = 25;

/**
 * Create a table row for a bundle, to be shown in the list of messages. 
 */
function create(label, style, order, messages, hasUnread, toggleBundle, baseUrl) {
    const displayedMessageCount = messages.length >= MAX_MESSAGE_COUNT 
        ? `${MAX_MESSAGE_COUNT}+` 
        : messages.length;
    const unreadClass = hasUnread ? _util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].UNREAD : _util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].READ;

    let spacerClass = '';
    if (document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["Selectors"].IMPORTANCE_MARKER)) {
        spacerClass = _util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].IMPORTANCE_MARKER;
    }
    else if (document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["Selectors"].PERSONAL_LEVEL_INDICATOR)) {
        spacerClass = _util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].PERSONAL_LEVEL_INDICATOR;
    }

    const sendersText = _generateSendersText(messages).join(', ');

    const snoozedText = messages[0].querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["Selectors"].MESSAGE_SNOOZED_TEXT);
    const latestDate = snoozedText
        ? snoozedText.innerText
        : messages[0].querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["Selectors"].MESSAGE_DATE_SPAN).innerText;

    const latestIsUnreadClass = messages[0].classList.contains(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].UNREAD) ? 'unread' : '';
    const latestIsSnoozedClass = snoozedText ? _util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].SNOOZED : '';

    const iconStyle = _composeIconStyle(style);
    const labelStyle = _composeLabelStyle(style);
    const backgroundStyle = _composeBackgroundStyle(style);

    const html = `
        <tr class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].ROW} ${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["InboxyClasses"].BUNDLE_ROW} ${unreadClass}" ${backgroundStyle}>
            <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL} PF"></td>
            <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL} oZ-x3"></td>
            <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL} bundle-icon"></td>
            <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL} yX">
                <div class="bundle-and-count">
                    <span class="bundle-label" ${labelStyle}>${label}</span>
                    <span class="bundle-count">(${displayedMessageCount})</span>
                </div>
            </td>
            <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL} ${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].SUBJECT_CELL}">
                <span class="bundle-senders">
                    ${sendersText}
                </span>
            </td>
            <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL} flex-grow"></td>
        </tr>
    `;

    const bulkArchiveButton = _BulkArchiveButton__WEBPACK_IMPORTED_MODULE_0__["default"].create(messages);
    const bulkArchiveTd = _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].htmlToElement(`<td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL}"></td>`);
    bulkArchiveTd.appendChild(bulkArchiveButton);

    const labelUrl = label
        .split(' ').join('-')
        .split('/').join('%2F')
        .split('&').join('-');
    const url = `${baseUrl}#search/label%3AInbox+label%3A${labelUrl}`;
    const viewAllButtonHtml = `
        <td class="${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL}">
            <a 
                href="${url}" 
                class="view-all-link"
            >
                <div class="view-all">
                    View all
                </div>
            </a>
        </td>
    `;

    const bundleDateHtml = `
        <td class="bundle-date-cell ${snoozedText ? '' : _util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].DATE_CELL} ${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].CELL}">
        </td>
    `;

    const el = _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].htmlToElement(html);
    el.appendChild(bulkArchiveTd);
    el.appendChild(_util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].htmlToElement(bundleDateHtml));
    el.appendChild(_util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].htmlToElement(viewAllButtonHtml));

    el.addEventListener('click', e => {
        if (!e.target.matches(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_3__["InboxyClasses"].VIEW_ALL_LINK}`) && 
            !e.target.matches('.view-all')) 
        {
            toggleBundle(label);
        }
        
        // Don't propagate to handler for click-outside to close bundle
        e.stopPropagation();
    });
    el.style.order = order;

    return el;
}

function _composeIconStyle(gmailLabelStyle) {
    const c0 = new _containers_Color__WEBPACK_IMPORTED_MODULE_4__["default"](gmailLabelStyle["background-color"]);
    const iconStyle = _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].slice(
        gmailLabelStyle, "background-color", "border-radius"
    );
    iconStyle["background-color"] = Object.assign({}, c0, {_a: 0.33});
    return _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].styleFor(iconStyle);
}

function _composeLabelStyle(gmailLabelStyle) {
    // return `style="color: ` + gmailLabelStyle["background-color"] + `; filter: brightness(80%); background-color: ` + gmailLabelStyle["color"] + `"`; 
    return _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].styleFor(gmailLabelStyle);
}

function _composeBackgroundStyle(gmailLabelStyle) {
    const c0 = new _containers_Color__WEBPACK_IMPORTED_MODULE_4__["default"](gmailLabelStyle["background-color"]);
    const g1 = Object.assign({}, c0, {_a: .33});
    const g2 = Object.assign({}, c0, {_a: .11});
    const g3 = new _containers_Color__WEBPACK_IMPORTED_MODULE_4__["default"](0,0,0,0);
    return `style="background: linear-gradient(.5turn, ${g1}, ${g2}, ${g3}, ${g3});"`;
}

function _generateSendersText(messages) {
    const dedupedSenders = [];
    const unreadStatusBySenders = {};

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const sendersElements = [...message.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["Selectors"].SENDERS)];;
        
        for (let j = sendersElements.length - 1; j >= 0; j--) {
            const sender = sendersElements[j].innerText;
            if (!unreadStatusBySenders.hasOwnProperty(sender)) {
                dedupedSenders.push(sender);
            }
            const isUnread = sendersElements[j].classList.contains(_util_Constants__WEBPACK_IMPORTED_MODULE_3__["GmailClasses"].UNREAD_SENDER);
            unreadStatusBySenders[sender] = !!unreadStatusBySenders[sender] || isUnread;
        }
    }

    return dedupedSenders.map(s => 
        unreadStatusBySenders[s] ? `<span class="unread-sender">${s}</span>` : s)
}

/* harmony default export */ __webpack_exports__["default"] = ({ create });


/***/ }),

/***/ "./src/components/ComposeButton.js":
/*!*****************************************!*\
  !*** ./src/components/ComposeButton.js ***!
  \*****************************************/
/*! exports provided: createComposeButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComposeButton", function() { return createComposeButton; });
function createComposeButton() {
    const floatingComposeButton = document.createElement("div");
    floatingComposeButton.className = "floating-compose";
    floatingComposeButton.addEventListener("click", function () {
      // TODO: Replace all of the below with gmail.compose.start_compose() via the Gmail.js lib
      const composeButton = document.querySelector(".T-I.T-I-KE.L3");
      composeButton.click();
    });
    document.body.appendChild(floatingComposeButton);
}



/***/ }),

/***/ "./src/components/DateDivider.js":
/*!***************************************!*\
  !*** ./src/components/DateDivider.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_BulkArchiveButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/BulkArchiveButton */ "./src/components/BulkArchiveButton.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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






/**
 * Helper functions for creating rows that divide messages into groups by date, 
 * ex. "Today", "Yesterday", "This month", etc.
 */

const DividerDate = {
    TODAY: { value: 1, text: 'Today' },
    YESTERDAY: { value: 2, text: 'Yesterday' },
    THIS_MONTH: { value: 3, text: 'This month' },
    LAST_MONTH: { value: 4, text: 'Last month' },
    EARLIER: { value: 5, text: 'Earlier' }
};

/**
 * Inserts date divider objects between the given rows, and returns the 
 * modified list of rows with date divider rows.
 */
function withDateDividers(
    messagesAndBundleRows, 
    sampleDate, 
    getLatestMessageForRow = x => x ? x.element : null,
    getNow = () => new Date()) 
{
    const rows = [];
    
    let dateDividers = _getDateDividers(sampleDate, getNow());
    let prevRow = null;
    let addedTodayForSnoozedMessage = false;
    for (let i = 0; i < messagesAndBundleRows.length; i++) {
        const currRow = messagesAndBundleRows[i];
        if (getLatestMessageForRow(currRow).querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_2__["Selectors"].MESSAGE_SNOOZED_TEXT)) { 
            // Use "Today" if the first message is snoozed
            if (i === 0 && dateDividers.length) {
                rows.push({
                    element: dateDividers[0],
                    type: _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].DATE_DIVIDER,
                });
                addedTodayForSnoozedMessage = true;
            }

            rows.push(currRow);

            // Don't push dividers in front of snoozed rows; they'll belong to
            // the same section as the previous row
            continue;
        }

        const divider = _shouldInsertDateDivider(
            getLatestMessageForRow(prevRow), getLatestMessageForRow(currRow), dateDividers);
        if (divider && 
            // If "Today" was already added for a snoozed message, then don't add it again
            !(addedTodayForSnoozedMessage && divider.value === DividerDate.TODAY.value)) 
        {
            rows.push({
                element: divider,
                type: _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].DATE_DIVIDER,
            });                   
        }

        rows.push(currRow);
        prevRow = currRow;
    }

    return rows;
}

/**
 * Find messages that are between the given dividerIndex and the next date divider.
 */
function findMessagesForDivider(tableRows, dividerIndex) {
    const messages = [];
    for (let i = dividerIndex + 1; i < tableRows.length; i++) {
        const row = tableRows[i];
        if (row.type === _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].DATE_DIVIDER) {
            break;
        }
        else if (row.type === _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].UNBUNDLED_MESSAGE) {
            messages.push(row.element);
        }
        else if (row.type === _util_Constants__WEBPACK_IMPORTED_MODULE_2__["Element"].BUNDLE) {
            messages.push(...row.element.getMessages());
        }
    }

    return messages;
}

/**
 * Create a date divider row.
 */
function create(divider, order, messages) {
    const html = `
        <div class="date-row">
            ${divider.text}
        </div>
    `;
    const el = _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].htmlToElement(html);
    el.style.order = order;

    el.appendChild(_components_BulkArchiveButton__WEBPACK_IMPORTED_MODULE_0__["default"].create(messages));

    return el;
}

/**
 * Return a list of date dividers, based on the provided current date. 
 * 
 * Date dividers are objects with the fields 'value' (enum value), 'text' (displayed to user), and 
 * 'endDate' (date defining the end of the time range);
 *
 * If date dividers aren't supported for dates in a format of the sampleDateString, returns 
 * an empty list.
 */
function _getDateDividers(sampleDateString, now) {
    if (!_isDateDividerSupported(sampleDateString)) {
        return [];
    }

    const today = new Date(now.getTime());
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const tomorrow = new Date(today.getTime());
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 1);

    const monthStart = new Date(today.getTime());
    monthStart.setDate(1);

    const lastMonthStart = new Date(monthStart.getTime());
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

    const useThisMonth = yesterday.getTime() > monthStart.getTime();

    return [
        { 
            ...DividerDate.TODAY,
            endDate: tomorrow
        },
        {
            ...DividerDate.YESTERDAY,
            endDate: today
        },
        {
            ...(useThisMonth ? DividerDate.THIS_MONTH : DividerDate.LAST_MONTH),
            endDate: yesterday
        },
        {
            ...DividerDate.EARLIER,
            endDate: useThisMonth ? monthStart : lastMonthStart
        }
    ];
}

function _isDateDividerSupported(sampleDateString) {
    if (!sampleDateString) {
        return false;
    }

    return !!_parseDate(sampleDateString);
}

function _parseDate(dateString) {
    const date = Date.parse(dateString);
    if (isNaN(date)) {
        return null;
    }

    return new Date(date);
}

/**
 * Returns the date divider object that should be used to divide prev and curr message node,
 * if any, or null otherwise. 
 */
function _shouldInsertDateDivider(prevMessageNode, currMessageNode, dateDividers) {
    for (let i = dateDividers.length - 1; i >= 0; i--) {
        const dividerDate = dateDividers[i].endDate;
        const prevDate = prevMessageNode 
            ? _extractMessageDate(prevMessageNode) 
            : null;
        const currDate = _extractMessageDate(currMessageNode);

        if ((prevDate == null || prevDate >= dividerDate) && dividerDate > currDate) {
            return dateDividers[i];
        }
    }

    return null;
}

function _extractMessageDate(message) {
    return _parseDate(_util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].extractDate(message));
}

/* harmony default export */ __webpack_exports__["default"] = ({
    create,
    withDateDividers,
    findMessagesForDivider,
    // Exposed for testing
    _getDateDividers,
});


/***/ }),

/***/ "./src/components/PinnedToggle.js":
/*!****************************************!*\
  !*** ./src/components/PinnedToggle.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
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





/**
 * Toggle between the inbox and pinned messages.
 */
class PinnedToggle {
    constructor() {
        this.showPinned = false;
        this.baseUrl = Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__["getCurrentBaseUrl"])();

        this._onHashChange = this._onHashChange.bind(this);
        this._toggle = this._toggle.bind(this);

        window.addEventListener('hashchange', this._onHashChange);
    }

    /** 
     * Returns a toggle dom element that changes state on hashchange and click events.
     */
    create() {
        const anchorElement = _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].htmlToElement(`
            <a href="">
                <div class="slider">
                    <div class="slider-button"></div>
                </div>
            </a>
        `);
        // Toggle immediately on click
        //
        // The new state of the toggle should be correct, but in case it isn't, the state
        // also gets set based on the url upon hashchange
        anchorElement.addEventListener('click', this._toggle);

        const toggleElement = _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].htmlToElement(`<div class="pinned-toggle"></div>`);
        toggleElement.appendChild(anchorElement);

        this.toggleElement = toggleElement;
        this.anchorElement = anchorElement;

        this._updateToggle(window.location.href);

        return this.toggleElement;
    }

    /**
     * Toggle the state visually. 
     */
    _toggle() {
        if (this.toggleElement.classList.contains('show-pinned')) {
            this.toggleElement.classList.remove('show-pinned');
        }
        else {
            this.toggleElement.classList.add('show-pinned');
        }
    }
    
    /**
     * Set the state based on the current url.
     */
    _onHashChange(e) {
        this._updateToggle(e.newURL);
    }

    /**
     * Update the link and styling of the toggle based on the current url,
     * or hide the toggle if it shouldn't be shown.
     */
    _updateToggle(url) {
        if (Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__["isStarredPage"])(url)) {
            this.toggleElement.style = {};
            this.anchorElement.href = `${this.baseUrl}#inbox`;
            this.toggleElement.classList.add('show-pinned');
            document.querySelector('html').classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].SHOW_PINNED_TOGGLE);
        }
        else if (Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__["supportsBundling"])(url)) {
            this.toggleElement.style = {};
            this.anchorElement.href = `${this.baseUrl}#${_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Urls"].STARRED_PAGE_HASH}`;
            this.toggleElement.classList.remove('show-pinned');
            document.querySelector('html').classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].SHOW_PINNED_TOGGLE);
        } 
        else {
            document.querySelector('html').classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].SHOW_PINNED_TOGGLE);
            this.toggleElement.style.display = 'none';
        }
    }
} 

/* harmony default export */ __webpack_exports__["default"] = (PinnedToggle);

/***/ }),

/***/ "./src/containers/Bundle.js":
/*!**********************************!*\
  !*** ./src/containers/Bundle.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/**
 * A bundle of messages that belong to a particular label.
 */
class Bundle {
    constructor(label, style) {
        this._label = label;
        this._style = style;
        this._bundleRow = null;
        this._order = null;
        this._messages = [];
    }

    setBundleRow(bundleRow) {
        this._bundleRow = bundleRow;
    }

    setOrder(order) {
        this._order = order;
    }

    addMessage(message) {
        this._messages.push(message);
    }

    /**
     * The label text associated with this bundle.
     */
    getLabel() {
        return this._label;
    }
    
    /**
     * The style associated with this bundle.
     */
    getStyle() {
        return this._style;
    }

    /**
     * The dom element for the table row representing the bundle.
     */
    getBundleRow() {
        return this._bundleRow;
    }

    /**
     * The order property for the bundle row.
     */
    getOrder() {
        return this._order;
    }

    /**
     * A list of message dom elements, for messages in the bundle.
     */
    getMessages() {
        return this._messages;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Bundle);


/***/ }),

/***/ "./src/containers/BundledMail.js":
/*!***************************************!*\
  !*** ./src/containers/BundledMail.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
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



/**
 * The collection of bundled mail for the inbox.
 * 
 * Keeps track of bundles for each page/tab of messages, and the current open bundle.
 */
class BundledMail {
    constructor() { 
        // Bundles map, keyed by pageNumber, tab name, and label
        this._bundlesMap = {};
        this._openedBundleLabel = '';
    }

    /**
     * Get the bundle for the current page of messages.
     */
    getBundle(label) {
        return this.getBundleOnPage(label, Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__["getCurrentPageNumber"])());
    }

    /**
     * Get the bundle for the given page number and label.
     */
    getBundleOnPage(label, pageNumber) {
        return this._bundlesMap[pageNumber][Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__["getCurrentTab"])()][label];
    }

    /**
     * Returns a map of all bundles on the current page, by label.
     */
    getAllBundles() {
        return this._bundlesMap[Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__["getCurrentPageNumber"])()][Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__["getCurrentTab"])()];
    }

    /**
     * Returns the label corresponding to the currently open bundle.
     */
    getLabelOfOpenedBundle() {
        return this._openedBundleLabel;
    }

    /**
     * Record that the bundle with the given label, is currently open.
     */
    openBundle(label) {
        this._openedBundleLabel = label;
    }

    /**
     * Record that no bundles are open.
     */
    closeBundle() {
        this._openedBundleLabel = '';
    }

    /**
     * Associate bundlesByLabel with the given message page number.
     */
    setBundles(bundlesByLabel, pageNumber) {
        if (!this._bundlesMap[pageNumber]) {
            this._bundlesMap[pageNumber] = {};
        }

        this._bundlesMap[pageNumber][Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_0__["getCurrentTab"])()] = bundlesByLabel;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (BundledMail);

/***/ }),

/***/ "./src/containers/Color.js":
/*!*********************************!*\
  !*** ./src/containers/Color.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/**
 * A color.
 */
class RGBColor {
    constructor(...args) {
        if (args.length == 1
            && (typeof(args[0]) === 'string' || args[0] instanceof String)) {
            this._fromString(args[0])
        } else if (3 <= args.length && args.length <= 4) {
            this._r = args[0];
            this._g = args[1];
            this._b = args[2];
            if (args.length > 3) {
                this._a = args[3];
            }
        }
    }

    _fromString(str) {
        //TODO// parse str with a regexp instead
        const rgbaToString = function() { return `rgba(${this._r},${this._g},${this._b},${this._a})`; };
        const rgb  = (r,g,b)   => { return {_r:r, _g:g, _b:b, _a:1, toString: rgbaToString}; },
              rgba = (r,g,b,a) => { return {_r:r, _g:g, _b:b, _a:a, toString: rgbaToString}; };
        Object.assign(this, eval(str));
    }

    toString() {
        if (this._a !== undefined) {
            return `rgba(${this._r},${this._g},${this._b},${this._a})`;
        } else {
            return `rgb(${this._r},${this._g},${this._b})`;
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RGBColor);


/***/ }),

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bundling_BundleToggler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bundling/BundleToggler */ "./src/bundling/BundleToggler.js");
/* harmony import */ var _bundling_Bundler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bundling/Bundler */ "./src/bundling/Bundler.js");
/* harmony import */ var _bundling_DateGrouper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bundling/DateGrouper */ "./src/bundling/DateGrouper.js");
/* harmony import */ var _bundling_SelectiveBundling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bundling/SelectiveBundling */ "./src/bundling/SelectiveBundling.js");
/* harmony import */ var _containers_BundledMail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/BundledMail */ "./src/containers/BundledMail.js");
/* harmony import */ var _components_PinnedToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/PinnedToggle */ "./src/components/PinnedToggle.js");
/* harmony import */ var _handlers_TabPanelsObserver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handlers/TabPanelsObserver */ "./src/handlers/TabPanelsObserver.js");
/* harmony import */ var _handlers_MainParentObserver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handlers/MainParentObserver */ "./src/handlers/MainParentObserver.js");
/* harmony import */ var _handlers_MessageListWatcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./handlers/MessageListWatcher */ "./src/handlers/MessageListWatcher.js");
/* harmony import */ var _handlers_StarHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./handlers/StarHandler */ "./src/handlers/StarHandler.js");
/* harmony import */ var _handlers_ThemeChangeHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./handlers/ThemeChangeHandler */ "./src/handlers/ThemeChangeHandler.js");
/* harmony import */ var _components_ComposeButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/ComposeButton */ "./src/components/ComposeButton.js");
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
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





















const html = document.querySelector('html');
if (html) {
    html.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["InboxyClasses"].INBOXY);
}

const RETRY_TIMEOUT_MS = 50;

let isFreshPage = false;
const handleFreshPage = e => isFreshPage = true;

let interactedWithBundle = false;
const handleBundleInteraction = e => interactedWithBundle = true;
 
const messageListWatcher = new _handlers_MessageListWatcher__WEBPACK_IMPORTED_MODULE_8__["default"](mutations => {
    if (Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_13__["supportsBundling"])(window.location.href)) {
        const reopenRecentBundle = !isFreshPage;
        bundler.bundleMessages(reopenRecentBundle);
        starHandler.scrollIfNecessary();
        
        isFreshPage = false;
    }
});

const bundledMail = new _containers_BundledMail__WEBPACK_IMPORTED_MODULE_4__["default"]();
const bundleToggler = new _bundling_BundleToggler__WEBPACK_IMPORTED_MODULE_0__["default"](bundledMail);
const selectiveBundling = new _bundling_SelectiveBundling__WEBPACK_IMPORTED_MODULE_3__["default"]();
const bundler = new _bundling_Bundler__WEBPACK_IMPORTED_MODULE_1__["default"](bundleToggler, bundledMail, messageListWatcher, selectiveBundling);
const starHandler = new _handlers_StarHandler__WEBPACK_IMPORTED_MODULE_9__["default"](bundledMail, selectiveBundling);
const dateGrouper = new _bundling_DateGrouper__WEBPACK_IMPORTED_MODULE_2__["default"]();

// 
// Observers for handling navigation
// 
const rebundle = () => {
    if (!interactedWithBundle || isFreshPage) {
        bundleToggler.closeAllBundles();
    }
    bundler.bundleMessages(true);

    isFreshPage = false;
    interactedWithBundle = false;
};
const tabPanelsObserver = new _handlers_TabPanelsObserver__WEBPACK_IMPORTED_MODULE_6__["default"](mutations => rebundle());
const mainParentObserver = new _handlers_MainParentObserver__WEBPACK_IMPORTED_MODULE_7__["default"](mutations => {
    if (Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_13__["supportsBundling"])(window.location.href)) {
        rebundle();
    }
    else if (Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_13__["isStarredPage"])(window.location.href)) {
        dateGrouper.refreshDateDividers();
    }
});

//
// Attach event listeners
//
// Call the bundler when the page has loaded.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleContentLoaded);
}
else {
    handleContentLoaded();
}

document.addEventListener('mousedown', starHandler.handleStarring);

// Record when interactions with navigation, refreshes, or bundles occur
document.addEventListener('mousedown', e => {
    if (e.target.matches(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].INBOX_TAB) || 
        e.target.matches(`${_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].INBOX_TAB} *`) ||
        e.target.matches(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].PAGECHANGING_BUTTONS) ||
        e.target.matches(`${_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].REFRESH} *`)) 
    {
        handleFreshPage(e);
    }
    else if (e.target.matches(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_12__["InboxyClasses"].VIEW_ALL_LINK}`) ||
        e.target.matches(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_12__["InboxyClasses"].VIEW_ALL_LINK} *`) || 
        e.target.matches(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_12__["InboxyClasses"].BUNDLED_MESSAGE}`) ||
        e.target.matches(`.${_util_Constants__WEBPACK_IMPORTED_MODULE_12__["InboxyClasses"].BUNDLED_MESSAGE} *`)) 
    {
        handleBundleInteraction(e);
    }
});


//
// Initial bundling
//

function handleContentLoaded() {
    const bundleCurrentPage = Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_13__["supportsBundling"])(window.location.href);
    tryBundling(0, bundleCurrentPage);
    Object(_components_ComposeButton__WEBPACK_IMPORTED_MODULE_11__["createComposeButton"])();
}

function tryBundling(i, bundleCurrentPage) {
    if (i > 60) {
        throw new Error('inboxy was unable to bundle messages. To try again, refresh the page.')
    }

    if (!bundleCurrentPage) {
        // Attach observers so that bundling will occur later when it needs to
        const main = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].MAIN);
        if (!main) {
            // Try again later
            setTimeout(() => tryBundling(i + 1, bundleCurrentPage), RETRY_TIMEOUT_MS);
        }
        else {
            addPinnedToggle(); 
            startObservers();

            if (Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_13__["isStarredPage"])(window.location.href)) {
                dateGrouper.refreshDateDividers();
            }
        }
    }
    else {
        // Bundle messages on the current page
        const possibleMessageLists = document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].POSSIBLE_MESSAGE_LISTS);;
        const tableBody = possibleMessageLists.length 
            ? possibleMessageLists.item(1).querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].TABLE_BODY)
            : null;
        if (!tableBody) {
            // Try again later
            setTimeout(() => tryBundling(i + 1, bundleCurrentPage), RETRY_TIMEOUT_MS);
        }
        else {
            bundler.bundleMessages(false);
            addPinnedToggle();
            startObservers();
        }
    }
}

function startObservers() {
    const themeChangeHandler = new _handlers_ThemeChangeHandler__WEBPACK_IMPORTED_MODULE_10__["default"]();
    themeChangeHandler.observe();
    mainParentObserver.observe();
    tabPanelsObserver.observe();
}

function addPinnedToggle() {
    const searchForm = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_12__["Selectors"].SEARCH_FORM).parentNode;
    searchForm.appendChild((new _components_PinnedToggle__WEBPACK_IMPORTED_MODULE_5__["default"]()).create());
}


/***/ }),

/***/ "./src/handlers/MainParentObserver.js":
/*!********************************************!*\
  !*** ./src/handlers/MainParentObserver.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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



/**
 * Observe the parent element of the role="main" element, and record when the element 
 * designated with role="main" changes.
 *
 * This is used to help with rebundling when navigating between different pages that have
 * message lists.
 */
class MainParentObserver {
    constructor(callback) {
        this.mainParent = null;
        
        this.observer = new MutationObserver(mutations => {
            const filteredMutations = mutations.filter(m => m.target.matches(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].PAGE));

            if (filteredMutations.length) {
                callback(filteredMutations);
            }
        });
    }

    observe() {
        const main = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].MAIN);
        this.mainParent = main.parentNode;
        this.observer.observe(this.mainParent, { 
            attributes: true, 
            childList: false, 
            subtree: true,
            attributeFilter: ['role'],
        });
    }

    disconnect() {
        this.observer.disconnect();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (MainParentObserver);

/***/ }),

/***/ "./src/handlers/MessageListWatcher.js":
/*!********************************************!*\
  !*** ./src/handlers/MessageListWatcher.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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



const OBSERVER_CONFIG = { attributes: false, childList: true, subtree: false };

/**
 * Wraps a mutation observer for an ancestor of the message list tables.
 * 
 * In addition to manually refreshes triggered by the user, Gmail occasionally replaces the children
 * of this dom element, resulting in the message list getting redrawn to its original 
 * unbundled state.
 */
class MessageListWatcher {
    constructor(callback) {
        this.observer = new MutationObserver(callback);
    }

    observe() {
        const possibleMessageLists = document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].POSSIBLE_MESSAGE_LISTS);;
        const messageListContainer = possibleMessageLists.length 
            ? possibleMessageLists.item(1) 
            : null;
            
        if (messageListContainer) {
            this.observer.observe(messageListContainer, OBSERVER_CONFIG);
        }
    }

    disconnect() {
        this.observer.disconnect();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (MessageListWatcher);

/***/ }),

/***/ "./src/handlers/MessageSelectHandler.js":
/*!**********************************************!*\
  !*** ./src/handlers/MessageSelectHandler.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
/* harmony import */ var _bundling_InboxyStyler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bundling/InboxyStyler */ "./src/bundling/InboxyStyler.js");
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






const MESSAGE_LIST_CONFIG = { 
    attributes: true,
    childList: false,
    subtree: false,
    attributeOldValue: true,
};

/**
 * Observers to handle when messages' checkboxes are clicked.
 *
 * Reapplies inboxy styling when Gmail applies its original styles when a message is selected.
 */
class MessageSelectHandler {

    constructor(bundledMail, selectiveBundling) {
        this.bundledMail = bundledMail;
        this.selectiveBundling = selectiveBundling;
        this.messageObservers = [];
        this.inboxyStyler = new _bundling_InboxyStyler__WEBPACK_IMPORTED_MODULE_3__["default"](bundledMail);

        this._handleMessageChange = this._handleMessageChange.bind(this);
    }

    /**
     * Start observing the given messages.
     */
    startWatching(messageElements) {
        this.messageObservers = messageElements.map(el => {
            const observer = new MutationObserver(this._handleMessageChange);
            observer.observe(el, MESSAGE_LIST_CONFIG);
            return observer;
        });
    }

    /**
     * Stop watching all messages.
     */
    stopWatching() {
        this.messageObservers.forEach(o => o.disconnect());
        this.messageObservers = [];
    }

    _handleMessageChange(mutations) {
        if (!Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__["supportsBundling"])(window.location.href)) {
            return;
        }

        mutations.forEach(mutation => {
            if (mutation.type !== 'attributes' || mutation.attributeName !== 'class') {
                return;
            }

            const message = mutation.target;

            // Re-add inboxy styling that get removed when gmail applies checked/unchecked styling
            if (mutation.oldValue.includes(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].BUNDLED_MESSAGE) &&
                !message.classList.contains(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].BUNDLED_MESSAGE)) 
            {
                // Bundled message
                message.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].BUNDLED_MESSAGE);
                if (mutation.oldValue.includes(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].VISIBLE)) {
                    message.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].VISIBLE);
                }
                if (mutation.oldValue.includes(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].LAST)) {
                    message.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].LAST);
                }
            }
            
            if (mutation.oldValue.includes(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["GmailClasses"].SELECTED) !== 
                message.classList.contains(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["GmailClasses"].SELECTED)) 
            {
                this.inboxyStyler.markSelectedBundlesFor(
                    this.selectiveBundling.filterStrings(_util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].getLabels(message)));
                this.inboxyStyler.disableBulkArchiveIfNecessary();
            }
        });    
    }

    
}

/* harmony default export */ __webpack_exports__["default"] = (MessageSelectHandler);


/***/ }),

/***/ "./src/handlers/PinnedMessageListWatcher.js":
/*!**************************************************!*\
  !*** ./src/handlers/PinnedMessageListWatcher.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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



const OBSERVER_CONFIG = { attributes: false, childList: true, subtree: true };

/**
 * Observer for the pinned message list.
 *
 * Watches for added/removed rows in the table body.
 */
class PinnedMessageListWatcher {
    constructor(callback) {
        this.observer = new MutationObserver(callback);
    }

    observe() {
        const possibleMessageLists = document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].POSSIBLE_MESSAGE_LISTS);
        const messageListContainer = possibleMessageLists.length 
            ? possibleMessageLists.item(1) 
            : null;
            
        if (messageListContainer) {
            const tbody = messageListContainer.querySelector('tbody');
            if (tbody) {
                this.observer.observe(tbody, OBSERVER_CONFIG);
            }
        }
    }

    disconnect() {
        this.observer.disconnect();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (PinnedMessageListWatcher);

/***/ }),

/***/ "./src/handlers/QuickSelectHandler.js":
/*!********************************************!*\
  !*** ./src/handlers/QuickSelectHandler.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
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





/**
 * Enable quick selection of multiple messages via shift + click.
 *
 * To do so, this class actually listens to all clicks to checkboxes (even when shift key is not 
 * pressed), since click history is needed to determine whether messages should be selected or 
 * deselected.
 */
class QuickSelectHandler {

    constructor() {
        this.mostRecentCheckboxClick = null;
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

        window.addEventListener('hashchange', () => this.mostRecentCheckboxClick = null);
    }

    /**
     * Handler for when a checkbox is clicked.
     *
     * Assumes that this handler will be applied to checkbox dom elements of the same kind, with 
     * unique ids.
     */
    handleCheckboxClick(e) {
        // Only handle real clicks
        if (!(e.clientX && e.clientY)) {
            return;
        }

        // Prevent gmail's shift + click handler from operating
        e.stopPropagation();
        
        const target = e.target;
        if (e.shiftKey && this.mostRecentCheckboxClick) {
            const { minOrder, maxOrder } = this._calculateOrderRange(
                document.getElementById(this.mostRecentCheckboxClick.checkboxId),
                target);
            const checkboxes = document.querySelectorAll(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].CHECKBOXES);

            this._selectMessagesInBetween(
                checkboxes, minOrder, maxOrder, this.mostRecentCheckboxClick.isChecked);
            target.focus();
        }
        else {
            target.click();
        }

        this.mostRecentCheckboxClick = {
            checkboxId: target.id,
            isChecked: _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].isChecked(target)
        };
    }

    /**
     * Returns an object with minOrder and maxOrder of the messages corresponding to the given 
     * checkboxes.
     */
    _calculateOrderRange(checkbox1, checkbox2) {
        const order1 = this._getOrder(checkbox1);
        const order2 = this._getOrder(checkbox2);
        let minOrder;
        let maxOrder;
        if (order1 < order2) {
            minOrder = order1;
            maxOrder = order2;
        }
        else {
            minOrder = order2;
            maxOrder = order1;
        }

        return { minOrder, maxOrder };
    }

    /**
     * Simulate clicks on messages that are visually between the target element and 
     * the most recently clicked element (inclusive) s.t. the checked state will match that of the 
     * most recently clicked element.
     */
    _selectMessagesInBetween(checkboxes, minOrder, maxOrder, isChecked) {
        checkboxes.forEach(checkbox => {
            const order = _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].findMessageRow(checkbox).style.order;
            if (minOrder <= order && 
                order <= maxOrder && 
                isChecked !== _util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].isChecked(checkbox)) 
            {
                checkbox.click();
            }
        });
    }

    /**
     * Return the order of the given checkbox's message.
     */
    _getOrder(checkbox) {
        return parseInt(_util_DomUtils__WEBPACK_IMPORTED_MODULE_2__["default"].findMessageRow(checkbox).style.order);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (QuickSelectHandler);


/***/ }),

/***/ "./src/handlers/StarHandler.js":
/*!*************************************!*\
  !*** ./src/handlers/StarHandler.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
/* harmony import */ var _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/DomUtils */ "./src/util/DomUtils.js");
/* harmony import */ var _util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/MessagePageUtils */ "./src/util/MessagePageUtils.js");
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





const _getTop = function(element) {
    return element.getBoundingClientRect().top;
};

/**
 * Handler for when messages are starred or unstarred.
 */
class StarHandler {
    constructor(bundledMail, selectiveBundling) {
        this.bundledMail = bundledMail;
        this.selectiveBundling = selectiveBundling;
        this.prevTop = null;

        this.handleStarring = this.handleStarring.bind(this);
    }

    /**
     * Handle starring or unstarring.
     */
    handleStarring(e) {
        if (!Object(_util_MessagePageUtils__WEBPACK_IMPORTED_MODULE_2__["supportsBundling"])(window.location.href)) {
            return;
        }

        const isStarring = e.target.matches(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].UNSTARRED);
        const isUnstarring = e.target.matches(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].STARRED);

        if (!isStarring && !isUnstarring) {
            return;
        }

        // Only applies to bundled messages
        const messageRow = _util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].findMessageRow(e.target);
        const labels = this.selectiveBundling.filterStrings(_util_DomUtils__WEBPACK_IMPORTED_MODULE_1__["default"].getLabels(messageRow));
        if (!labels.length) {
            return;
        }

        // Record the scroll position
        let elementTop;
        // Message top
        if (isUnstarring) {
            this.bundledMail.openBundle(labels[0]);
            elementTop = _getTop(messageRow);
        } 
        // Bundle row top
        else if (isStarring) {
            const label = this.bundledMail.getLabelOfOpenedBundle();
            const bundleRow = this.bundledMail.getBundle(label).getBundleRow();
            elementTop = _getTop(bundleRow);
        }

        const scrollableContainer = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].SCROLLABLE_CONTAINER);
        this.prevTop = scrollableContainer.scrollTop + _getTop(scrollableContainer) - elementTop;
    }

    /**
     * When the list of messages updates after starring/unstarring a message, adjust the scroll
     * position so that the message position on the screen is close to where it previously was.
     * 
     * The same message can't be easily retrieved after rebundling, so for unstarring, scroll to
     * match bundle row with where the message was, and for starring, scroll to match bundle row
     * where the bundle row was.
     */
    scrollIfNecessary() {
        const label = this.bundledMail.getLabelOfOpenedBundle();
        if (!this.prevTop || !label) {
            return;
        }

        const bundleRow = this.bundledMail.getBundle(label).getBundleRow();

        const elementTop = _getTop(bundleRow);
        const scrollableContainer = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].SCROLLABLE_CONTAINER);
        scrollableContainer.scrollTop = this.prevTop + elementTop - _getTop(scrollableContainer);

        this.prevTop = null;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (StarHandler);


/***/ }),

/***/ "./src/handlers/TabPanelsObserver.js":
/*!*******************************************!*\
  !*** ./src/handlers/TabPanelsObserver.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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



/**
 * Observe tabpanels to detect when the current inbox tab changes.
 */
class TabPanelsObserver {
    constructor(callback) {        
        this.observer = new MutationObserver(mutations => {
            const filteredMutations = mutations.filter(m => m.target.matches(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].TABPANELS));

            if (filteredMutations.length) {
                callback(filteredMutations);
            }
        });
    }

    observe(selector) {
        const main = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].MAIN);
        this.mainParent = main.parentNode;
        this.observer.observe(this.mainParent, { 
            attributes: true, 
            childList: false, 
            subtree: true,
            attributeFilter: ['style'],
        });
    }

    disconnect() {
        this.observer.disconnect();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (TabPanelsObserver);

/***/ }),

/***/ "./src/handlers/ThemeChangeHandler.js":
/*!********************************************!*\
  !*** ./src/handlers/ThemeChangeHandler.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Constants */ "./src/util/Constants.js");
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



/**
 * Handles changes in Gmail themes and updates inboxy theme styling accordingly.
 */
class ThemeChangeHandler {
    constructor() {
        this.observer = new MutationObserver(mutations => {
            // When the theme is updated, the contents of a style tag are updated
            if (mutations.some(m => m.target.tagName === 'STYLE')) {
                this._applyTheme();
            }            
        });
    }

    /**
     * Observe and react to theme changes.
     */
    observe() {
        this._applyTheme();

        this.observer.observe(document.querySelector('head'), { 
            attributes: false, 
            childList: true, 
            subtree: true,
        });

        // Re-apply theme on hashchange, since messages-dark-theme relies on
        // messages being present on the current page
        window.addEventListener('hashchange', e => this._applyTheme());
    }

    /**
     * Apply the appropriate light/dark theme styling, so that inboxy theming matches Gmail.
     */
    _applyTheme() {
        const node = document.querySelector('html');
        const sidepaneText = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].SIDEPANE_TEXT);
        if (this._isLight(getComputedStyle(sidepaneText).color)) {
            node.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].DARK_THEME);
        }
        else {
            node.classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].DARK_THEME);
        }

        const message = document.querySelector(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].SAMPLE_MESSAGE);
        if (!message) {
            return;
        }
        if (!this._isLight(getComputedStyle(message).backgroundColor)) {
            node.classList.add(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].MESSAGES_DARK_THEME);
        }
        else {
            node.classList.remove(_util_Constants__WEBPACK_IMPORTED_MODULE_0__["InboxyClasses"].MESSAGES_DARK_THEME);
        }

        if (message.clientHeight <= 28) {
            node.classList.add('compact');
        }
        else {
            node.classList.remove('compact');
        }
    }

    /**
     * Whether the color represented by the rgb string is closer to white than to black.
     */
    _isLight(rgbString) {
        const rgb = this._rgbStringToRgb(rgbString);
        const intensity = this._rgbToGrayscale(rgb);

        return intensity > (255 / 2);
    }

    /**
     * Converts an rgb(a) string, ex. 'rgb(243, 128, 4)' or 'rgba(243, 128, 4, 0.8)', to an 
     * array of rgb values. The alpha value is discarded.
     */
    _rgbStringToRgb(rgbString) {
        const openParenIndex = rgbString.indexOf('(');
        const rgbValues = rgbString.substring(openParenIndex + 1, rgbString.length - 1);
        return rgbValues.split(',').map(s => parseInt(s.trim())).slice(0, 3);
    }

    /** 
     * Converts an array of RGB values to grayscale intensity value.
     */
    _rgbToGrayscale(rgb) {
        return (rgb[0] + rgb[1] + rgb[2]) / 3;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ThemeChangeHandler);

/***/ }),

/***/ "./src/util/Constants.js":
/*!*******************************!*\
  !*** ./src/util/Constants.js ***!
  \*******************************/
/*! exports provided: ORDER_INCREMENT, NO_TAB, GmailClasses, InboxyClasses, Selectors, TableBodySelectors, Urls, Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_INCREMENT", function() { return ORDER_INCREMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_TAB", function() { return NO_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GmailClasses", function() { return GmailClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InboxyClasses", function() { return InboxyClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Selectors", function() { return Selectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableBodySelectors", function() { return TableBodySelectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Urls", function() { return Urls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
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

/**
 * The amount that the order property is incremented by,
 * for non-bundled-message elements. 
 *
 * This should be equal to (or greater than) the maximum number of messages per page,
 * since we reserve the order numbers in between the jumps for bundled messages. 
 * (Worst case, all messages on a page share a common label, and all belong in the same bundle.)
 */
const ORDER_INCREMENT = 100;

const NO_TAB = '__NO_TAB';

const GmailClasses = {
    ARCHIVE_BUTTON: 'brq bqX',
    CELL: 'xY',
    DATE_CELL: 'xW',
    IMPORTANCE_MARKER: 'WA',
    PERSONAL_LEVEL_INDICATOR: 'bnk',
    READ: 'yO',
    ROW: 'zA',
    SELECTED: 'x7',
    SNOOZED: 'cL',
    STARRED: 'T-KT-Jp',
    SUBJECT_CELL: 'a4W',
    UNREAD: 'zE',
    UNREAD_SENDER: 'zF',
};

const InboxyClasses = {
    BUNDLE_ROW: 'bundle-row',
    BUNDLED_MESSAGE: 'bundled-message',
    DARK_THEME: 'dark-theme',
    MESSAGES_DARK_THEME: 'messages-dark-theme',
    INBOXY: 'inboxy',
    LAST: 'last',
    SHOW_PINNED_TOGGLE: 'show-pinned-toggle',
    VIEW_ALL_LINK: 'view-all-link',
    VISIBLE: 'visible',
};

const PAGE = '.BltHke.nH.oy8Mbf';
const MAIN = `[role="main"]`;
const CURRENT_TABPANEL = `${MAIN} .ae4:not([style*="none"])`;
const POSSIBLE_MESSAGE_LISTS = `${CURRENT_TABPANEL} .Cp`; 
const LABELS = `.ar.as .at`;
const Selectors = {
    CHECKBOXES: `${CURRENT_TABPANEL} tr td .oZ-jc.T-Jo.J-J5-Ji`,
    CURRENT_TAB: `${MAIN} [role="tab"][aria-selected="true"]`,
    CURRENT_TABPANEL: CURRENT_TABPANEL,
    INBOX_LABEL: `${LABELS}[title="Inbox"]`,
    INBOXY: `.${InboxyClasses.INBOXY}`,
    LABEL_LEAF: '.au .av',
    LABEL_CONTAINERS: '.ar.as',
    LABELS: LABELS,
    IMPORTANCE_MARKER: `.${GmailClasses.ROW} .${GmailClasses.IMPORTANCE_MARKER}`,
    INBOX_TAB: '.TO[data-tooltip="Inbox"]',
    MAIN: MAIN,
    MESSAGE_CHECKBOX: '.oZ-jc.T-Jo.J-J5-Ji',
    MESSAGE_DATE: '.xW span',
    MESSAGE_DATE_SPAN: `.xW span span`,
    MESSAGE_SNOOZED_TEXT: `.byZ.xY .cL`,
    POSSIBLE_MESSAGE_LISTS: POSSIBLE_MESSAGE_LISTS,
    PAGE: PAGE,
    PAGECHANGING_BUTTONS: '.ar5 .Di *',
    PERSONAL_LEVEL_INDICATOR:   
        `.${GmailClasses.ROW} > .${GmailClasses.PERSONAL_LEVEL_INDICATOR}:not(.byv)`,
    READ_MESSAGE: `tr.${GmailClasses.ROW}.${GmailClasses.READ}`,
    REFRESH: '.T-I.J-J5-Ji[act="20"]',
    SAMPLE_MESSAGE: `${POSSIBLE_MESSAGE_LISTS} tr.${GmailClasses.ROW}.${GmailClasses.READ}:not(.bundled-message)`,
    SEARCH_FORM: '#gb form',
    SELECTED: `${CURRENT_TABPANEL} tr.${GmailClasses.SELECTED}:not(.${InboxyClasses.BUNDLE_ROW})`,
    SENDERS: '.yX.xY .yW .bA4 span[email]',
    SCROLLABLE_CONTAINER: '.Tm.aeJ',
    SIDEPANE_TEXT: '.TO .nU',
    STARRED: `.T-KT.${GmailClasses.STARRED}`,
    TAB: `${MAIN} [role="tab"]`,
    TABPANELS: `${MAIN} [role="tabpanel"]`,
    TABLE_BODY: `.F tbody`,
    TOOLBAR_ARCHIVE_BUTTON: `.G-atb:not([style*="none"]) .T-I.J-J5-Ji[act="7"]`,
    UNSTARRED: `.T-KT.aXw`,
};

// Selectors for elements assuming we are selecting within TABLE_BODY
const TableBodySelectors = {
    MESSAGE_NODES: `tr.${GmailClasses.ROW}`,
};

const Urls = {
    STARRED_PAGE_HASH: 'search/is%3Astarred+label%3Ainbox',
};

const Element = {
    DATE_DIVIDER: 1,
    BUNDLE: 2,
    UNBUNDLED_MESSAGE: 3,
};




/***/ }),

/***/ "./src/util/DomUtils.js":
/*!******************************!*\
  !*** ./src/util/DomUtils.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/util/Constants.js");
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



const DomUtils = {
    findMessageRow: function(messageRowDescendant) {
        return messageRowDescendant.closest('tr');
    },

    extractDate: function(message) {
        return message.querySelector(_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].MESSAGE_DATE).title
    },

    isChecked: function(checkboxNode) {
        return checkboxNode.getAttribute('aria-checked') === 'true';
    },

    getLabels: function(message) {
        return [...message.querySelectorAll(_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].LABELS)];
    },

    /** Slice entries out of an object. */
    slice: function(src, ...keys) {
        const dst = {};
        for (const k of keys) {
            dst[k] = src[k];
        }
        return dst;
    },

    getCSS: function(element, ...cssAttributes) {
        const cssObj = {};
        const csm = element.computedStyleMap();
        for (let sty of cssAttributes) {
            cssObj[sty] = csm.get(sty).toString();
        }
        return cssObj;
    },

    styleFor: function(cssObj) {
        const css = Object.entries(cssObj).map(([k, v]) => `${k}: ${v};`).join("\n\t");
        const [hasSingleQuote, hasDoubleQuote] = ["'", '"'].map(q => css.indexOf(q) > -1);
        if (hasSingleQuote && hasDoubleQuote) {
            return "";  // Safely-punt on safely-quoting the css.
        } else if (hasSingleQuote) {
            return `style="${css}"`;
        } else {
            return `style='${css}'`;
        }
    },

    htmlToElement: function(html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (DomUtils);


/***/ }),

/***/ "./src/util/MessagePageUtils.js":
/*!**************************************!*\
  !*** ./src/util/MessagePageUtils.js ***!
  \**************************************/
/*! exports provided: getCurrentPageNumber, getPageNumber, getCurrentTab, supportsBundling, isStarredPage, getCurrentBaseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPageNumber", function() { return getCurrentPageNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageNumber", function() { return getPageNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTab", function() { return getCurrentTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsBundling", function() { return supportsBundling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStarredPage", function() { return isStarredPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentBaseUrl", function() { return getCurrentBaseUrl; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/util/Constants.js");
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



/**
 * Get the message page number of the given url.
 */
function getPageNumber(url) {
    const hash = _getHash(url);
    if (_matchesPage1(hash)) {
        return 1;
    }

    const matchesPageX = _matchesPageX(hash);
    if (matchesPageX) {
        return parseInt(matchesPageX[1]);
    }
};

/**
 * Get the message page number of the current url.
 */
function getCurrentPageNumber() {
    return getPageNumber(window.location.href);
};

/**
 * Get the name of the current tab.
 */
function getCurrentTab() {
    const tab = document.querySelector(_Constants__WEBPACK_IMPORTED_MODULE_0__["Selectors"].CURRENT_TAB);
    return tab ? tab.getAttribute('aria-label') : _Constants__WEBPACK_IMPORTED_MODULE_0__["NO_TAB"]; 
}

/**
 * Whether messages should be bundled on the page.
 */
function supportsBundling(url) {
    if (!url.includes('#')) {
        return true;
    }

    const hash = _getHash(url);
    return _matchesPage1(hash) || !!_matchesPageX(hash);
}

/**
 * Whether the given url is for showing all starred (pinned) messages that are
 * in the inbox.
 */
function isStarredPage(url) {
    return url.includes('#') &&
        (_matchesStarredPage1(_getHash(url)) || !!_matchesStarredPageX(_getHash(url)));
}

/**
 * Returns the part of the current url that precedes '#'.
 */
function getCurrentBaseUrl() {
    const url = window.location.href;
    const parts = url.split('#');
    return parts[0];
}

function _getHash(url) {
    const hash = url.split('#')[1];
    // # might be followed by ?
    const index = hash.indexOf('?');

    return index > 0 ? hash.substring(0, index) : hash;
}

function _matchesPage1(hash) {
    return hash === 'inbox';
}

function _matchesPageX(hash) {
    return hash.match(/^inbox\/p(\d+)$/);
}

function _matchesStarredPage1(hash) {
    return hash === _Constants__WEBPACK_IMPORTED_MODULE_0__["Urls"].STARRED_PAGE_HASH;
}

function _matchesStarredPageX(hash) {
    return hash.match(/^search\/is%3Astarred\+label%3Ainbox\/p(\d+)$/)
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1bmRsaW5nL0J1bmRsZVRvZ2dsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1bmRsaW5nL0J1bmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1bmRsaW5nL0RhdGVHcm91cGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9idW5kbGluZy9JbmJveHlTdHlsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1bmRsaW5nL1NlbGVjdGl2ZUJ1bmRsaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1bGtBcmNoaXZlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1bmRsZVJvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db21wb3NlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0RhdGVEaXZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Bpbm5lZFRvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9CdW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvQnVuZGxlZE1haWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvQ29sb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbmRsZXJzL01haW5QYXJlbnRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGFuZGxlcnMvTWVzc2FnZUxpc3RXYXRjaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9oYW5kbGVycy9NZXNzYWdlU2VsZWN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGFuZGxlcnMvUGlubmVkTWVzc2FnZUxpc3RXYXRjaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9oYW5kbGVycy9RdWlja1NlbGVjdEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbmRsZXJzL1N0YXJIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9oYW5kbGVycy9UYWJQYW5lbHNPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGFuZGxlcnMvVGhlbWVDaGFuZ2VIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9Eb21VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9NZXNzYWdlUGFnZVV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRWdFO0FBS3JDOztBQUUzQjtB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Q0Esc0JBQXNCO0FBQ3RCLFNBQVM7QUFDVCw2QkFBNkIsSUFBSTtBQUNqQyxTQUFTO0FBQ1QsNkJBQTZCLElBQUk7QUFDakM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHVFQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM1RXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFNcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0RBQVM7QUFDaEQsa0RBQWtELGlEQUFNLEM7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsK0NBQUk7QUFDeEI7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb250ZW50LmpzXCIpO1xuIiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IGdldEN1cnJlbnRQYWdlTnVtYmVyIH0gZnJvbSAnLi4vdXRpbC9NZXNzYWdlUGFnZVV0aWxzJztcbmltcG9ydCB7IFxuICAgIEluYm94eUNsYXNzZXMsIFxuICAgIFNlbGVjdG9ycywgXG4gICAgT1JERVJfSU5DUkVNRU5ULFxufSBmcm9tICcuLi91dGlsL0NvbnN0YW50cyc7XG5cbi8qKlxuICogT3BlbnMvY2xvc2VzIGJ1bmRsZXMgdG8gc2hvdy9oaWRlIGJ1bmRsZWQgbWVzc2FnZXMuXG4gKi9cbmNsYXNzIEJ1bmRsZVRvZ2dsZXIge1xuICAgIGNvbnN0cnVjdG9yKGJ1bmRsZWRNYWlsKSB7XG4gICAgICAgIHRoaXMuYnVuZGxlZE1haWwgPSBidW5kbGVkTWFpbDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudG9nZ2xlQnVuZGxlID0gdGhpcy50b2dnbGVCdW5kbGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vcGVuQnVuZGxlID0gdGhpcy5vcGVuQnVuZGxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VBbGxCdW5kbGVzID0gdGhpcy5jbG9zZUFsbEJ1bmRsZXMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICB0b2dnbGVCdW5kbGUobGFiZWwpIHtcbiAgICAgICAgY29uc3Qgb3BlbmVkQnVuZGxlTGFiZWwgPSB0aGlzLmJ1bmRsZWRNYWlsLmdldExhYmVsT2ZPcGVuZWRCdW5kbGUoKTtcblxuICAgICAgICBpZiAob3BlbmVkQnVuZGxlTGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGxCdW5kbGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3BlbmVkQnVuZGxlTGFiZWwgIT09IGxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5CdW5kbGUobGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbkJ1bmRsZShsYWJlbCkge1xuICAgICAgICB0aGlzLmJ1bmRsZWRNYWlsLm9wZW5CdW5kbGUobGFiZWwpO1xuICAgICAgICBjb25zdCBidW5kbGUgPSB0aGlzLmJ1bmRsZWRNYWlsLmdldEJ1bmRsZShsYWJlbCk7XG5cbiAgICAgICAgLy8gU2V0IG9yZGVyIGZvciBidW5kbGVkIG1lc3NhZ2VzIGFuZCBtYWtlIHRoZW0gdmlzaWJsZVxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IGJ1bmRsZS5nZXRNZXNzYWdlcygpO1xuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgICAgICAgZWwuc3R5bGUub3JkZXIgPSBidW5kbGUuZ2V0T3JkZXIoKSArIGkgKyAxO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChJbmJveHlDbGFzc2VzLlZJU0lCTEUpO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gbWVzc2FnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSW5ib3h5Q2xhc3Nlcy5MQVNUKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSGlkZSByZWR1bmRhbnQgbGFiZWxzXG4gICAgICAgICAgICBlbC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9ycy5MQUJFTF9DT05UQUlORVJTKS5mb3JFYWNoKGxjID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGMuY2hpbGROb2Rlc1swXS50aXRsZSA9PT0gbGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYnVuZGxlUm93ID0gYnVuZGxlLmdldEJ1bmRsZVJvdygpO1xuICAgICAgICBidW5kbGVSb3cuY2xhc3NMaXN0LmFkZChJbmJveHlDbGFzc2VzLlZJU0lCTEUpO1xuICAgICAgICAvLyBSZW1vdmUgdG9wIG1hcmdpbiB3aGVuIGJ1bmRsZSByb3cgZm9sbG93cyBhIGRhdGUgZGl2aWRlclxuICAgICAgICBpZiAoYnVuZGxlUm93LnByZXZpb3VzU2libGluZyAmJiBcbiAgICAgICAgICAgIGJ1bmRsZVJvdy5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXRlLXJvdycpICYmXG4gICAgICAgICAgICBidW5kbGUuZ2V0T3JkZXIoKSAtIGJ1bmRsZVJvdy5wcmV2aW91c1NpYmxpbmcuc3R5bGUub3JkZXIgPD0gT1JERVJfSU5DUkVNRU5UKVxuICAgICAgICB7XG4gICAgICAgICAgICBidW5kbGVSb3cuc3R5bGUubWFyZ2luVG9wID0gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2hvd0J1bmRsZUFyZWEoYnVuZGxlKTtcbiAgICB9XG5cbiAgICBjbG9zZUFsbEJ1bmRsZXMoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZEJ1bmRsZUxhYmVsID0gdGhpcy5idW5kbGVkTWFpbC5nZXRMYWJlbE9mT3BlbmVkQnVuZGxlKCk7XG4gICAgICAgIGlmICghb3BlbmVkQnVuZGxlTGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVuZGxlZE1haWwuY2xvc2VCdW5kbGUoKTtcblxuICAgICAgICAvLyBSZW1vdmUgc3R5bGVzIHRoYXQgd2VyZSBhZGRlZCB3aGVuIHRoZSBidW5kbGUgd2FzIG9wZW5lZFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtJbmJveHlDbGFzc2VzLkJVTkRMRURfTUVTU0FHRX0uJHtJbmJveHlDbGFzc2VzLlZJU0lCTEV9YClcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5vcmRlciA9ICcnO1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoSW5ib3h5Q2xhc3Nlcy5WSVNJQkxFKTtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKEluYm94eUNsYXNzZXMuTEFTVCk7XG5cbiAgICAgICAgICAgICAgICAvLyBVbmhpZGUgbGFiZWxzXG4gICAgICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvckFsbChTZWxlY3RvcnMuTEFCRUxfQ09OVEFJTkVSUykuZm9yRWFjaChsYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYy5zdHlsZS5kaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0luYm94eUNsYXNzZXMuQlVORExFX1JPV30uJHtJbmJveHlDbGFzc2VzLlZJU0lCTEV9YClcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKEluYm94eUNsYXNzZXMuVklTSUJMRSk7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUubWFyZ2luVG9wID0gJyc7XG4gICAgICAgICAgICB9KTsgICAgICAgIFxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idW5kbGUtYXJlYScpXG4gICAgICAgICAgICAuZm9yRWFjaChidW5kbGVBcmVhID0+IGJ1bmRsZUFyZWEuc3R5bGUuZGlzcGxheSA9ICcnKTtcbiAgICB9XG5cbiAgICBfc2hvd0J1bmRsZUFyZWEoYnVuZGxlKSB7XG4gICAgICAgIGNvbnN0IGJ1bmRsZUFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke1NlbGVjdG9ycy5DVVJSRU5UX1RBQlBBTkVMfSAuYnVuZGxlLWFyZWFgKTtcbiAgICAgICAgYnVuZGxlQXJlYS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICBjb25zdCB0b3AgPSBCdW5kbGVUb2dnbGVyLl9jYWxjdWxhdGVCdW5kbGVBcmVhVG9wKGJ1bmRsZS5nZXRCdW5kbGVSb3coKSk7XG4gICAgICAgIGJ1bmRsZUFyZWEuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IEJ1bmRsZVRvZ2dsZXIuX2NhbGN1bGF0ZUJ1bmRsZUFyZWFIZWlnaHQoYnVuZGxlLmdldE1lc3NhZ2VzKCkpO1xuICAgICAgICBidW5kbGVBcmVhLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgfVxuXG4gICAgc3RhdGljIF9jYWxjdWxhdGVCdW5kbGVBcmVhVG9wKGJ1bmRsZVJvdykge1xuICAgICAgICByZXR1cm4gYnVuZGxlUm93Lm9mZnNldFRvcCArIGJ1bmRsZVJvdy5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIF9jYWxjdWxhdGVCdW5kbGVBcmVhSGVpZ2h0KG1lc3NhZ2VzKSB7XG4gICAgICAgIHJldHVybiAobWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0ub2Zmc2V0VG9wIC0gbWVzc2FnZXNbMF0ub2Zmc2V0VG9wKSArIFxuICAgICAgICAgICAgbWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0ub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVuZGxlVG9nZ2xlcjsiLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IEJ1bmRsZSBmcm9tICcuLi9jb250YWluZXJzL0J1bmRsZSc7XG5cbmltcG9ydCBCdW5kbGVSb3cgZnJvbSAnLi4vY29tcG9uZW50cy9CdW5kbGVSb3cnO1xuaW1wb3J0IERhdGVEaXZpZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRGF0ZURpdmlkZXInO1xuXG5pbXBvcnQgUXVpY2tTZWxlY3RIYW5kbGVyIGZyb20gJy4uL2hhbmRsZXJzL1F1aWNrU2VsZWN0SGFuZGxlcic7XG5pbXBvcnQgTWVzc2FnZVNlbGVjdEhhbmRsZXIgZnJvbSAnLi4vaGFuZGxlcnMvTWVzc2FnZVNlbGVjdEhhbmRsZXInO1xuXG5pbXBvcnQgSW5ib3h5U3R5bGVyIGZyb20gJy4vSW5ib3h5U3R5bGVyJztcblxuaW1wb3J0IHsgXG4gICAgZ2V0Q3VycmVudFBhZ2VOdW1iZXIsIFxuICAgIGdldEN1cnJlbnRCYXNlVXJsLFxufSBmcm9tICcuLi91dGlsL01lc3NhZ2VQYWdlVXRpbHMnO1xuaW1wb3J0IHsgXG4gICAgR21haWxDbGFzc2VzLFxuICAgIEluYm94eUNsYXNzZXMsXG4gICAgU2VsZWN0b3JzLCBcbiAgICBUYWJsZUJvZHlTZWxlY3RvcnMsXG4gICAgT1JERVJfSU5DUkVNRU5ULCBcbiAgICBFbGVtZW50LFxufSBmcm9tICcuLi91dGlsL0NvbnN0YW50cyc7XG5pbXBvcnQgRG9tVXRpbHMgZnJvbSAnLi4vdXRpbC9Eb21VdGlscyc7XG5cbi8qKlxuICogR3JvdXBzIG1lc3NhZ2VzIGludG8gYnVuZGxlcywgYW5kIHJlbmRlcnMgdGhvc2UgYnVuZGxlcy5cbiAqL1xuY2xhc3MgQnVuZGxlciB7XG4gICAgY29uc3RydWN0b3IoYnVuZGxlVG9nZ2xlciwgYnVuZGxlZE1haWwsIG1lc3NhZ2VMaXN0V2F0Y2hlciwgc2VsZWN0aXZlQnVuZGxpbmcpIHtcbiAgICAgICAgdGhpcy5idW5kbGVUb2dnbGVyID0gYnVuZGxlVG9nZ2xlcjtcbiAgICAgICAgdGhpcy5idW5kbGVkTWFpbCA9IGJ1bmRsZWRNYWlsO1xuICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0V2F0Y2hlciA9IG1lc3NhZ2VMaXN0V2F0Y2hlcjtcbiAgICAgICAgdGhpcy5zZWxlY3RpdmVCdW5kbGluZyA9IHNlbGVjdGl2ZUJ1bmRsaW5nO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTZWxlY3RIYW5kbGVyID0gbmV3IE1lc3NhZ2VTZWxlY3RIYW5kbGVyKGJ1bmRsZWRNYWlsLCBzZWxlY3RpdmVCdW5kbGluZyk7XG4gICAgICAgIHRoaXMuaW5ib3h5U3R5bGVyID0gbmV3IEluYm94eVN0eWxlcihidW5kbGVkTWFpbCk7XG4gICAgICAgIHRoaXMucXVpY2tTZWxlY3RIYW5kbGVyID0gbmV3IFF1aWNrU2VsZWN0SGFuZGxlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1bmRsZSB0b2dldGhlciB0aGUgbWVzc2FnZXMgb24gdGhlIGN1cnJlbnQgcGFnZSBvZiBtZXNzYWdlcywgaWYgdGhleSBhcmVuJ3QgYWxyZWFkeSBidW5kbGVkLFxuICAgICAqIG9wdGlvbmFsbHkgcmVvcGVuaW5nIHRoZSBtb3N0IHJlY2VudGx5IG9wZW4gYnVuZGxlLlxuICAgICAqL1xuICAgIGJ1bmRsZU1lc3NhZ2VzKHJlb3BlblJlY2VudEJ1bmRsZSkge1xuICAgICAgICBjb25zdCBidW5kbGVkTWFpbCA9IHRoaXMuYnVuZGxlZE1haWw7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlTWVzc2FnZUxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3RvcnMuUE9TU0lCTEVfTUVTU0FHRV9MSVNUUyk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gcG9zc2libGVNZXNzYWdlTGlzdHMubGVuZ3RoIFxuICAgICAgICAgICAgPyBwb3NzaWJsZU1lc3NhZ2VMaXN0cy5pdGVtKHBvc3NpYmxlTWVzc2FnZUxpc3RzLmxlbmd0aCAtIDEpIFxuICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIGlmICghbWVzc2FnZUxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tZXNzYWdlTGlzdFdhdGNoZXIuZGlzY29ubmVjdCgpO1xuXG4gICAgICAgIC8vIE9ubHkgcmVkcmF3IGlmIG1lc3NhZ2UgbGlzdCBpc24ndCBzdGlsbCBidW5kbGVkXG4gICAgICAgIGlmICghbWVzc2FnZUxpc3QuY2hpbGRyZW5bMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1idW5kbGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1bmRsZU1lc3NhZ2VzKG1lc3NhZ2VMaXN0KTtcbiAgICAgICAgICAgIG1lc3NhZ2VMaXN0LmNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoJ2lzLWJ1bmRsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVpdGhlciByZW9wZW4gdGhlIGJ1bmRsZSB0aGF0IHdhcyBvcGVuLCBvciBjbG9zZSBhbGwgYnVuZGxlc1xuICAgICAgICBpZiAocmVvcGVuUmVjZW50QnVuZGxlICYmIGJ1bmRsZWRNYWlsLmdldEJ1bmRsZShidW5kbGVkTWFpbC5nZXRMYWJlbE9mT3BlbmVkQnVuZGxlKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bmRsZVRvZ2dsZXIub3BlbkJ1bmRsZShidW5kbGVkTWFpbC5nZXRMYWJlbE9mT3BlbmVkQnVuZGxlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnVuZGxlZE1haWwuY2xvc2VCdW5kbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWVzc2FnZUxpc3RXYXRjaGVyLm9ic2VydmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdW5kbGUgbWVzc2FnZXMgaW4gdGhlIGdpdmVuIG1lc3NhZ2VMaXN0IGRvbSBub2RlLlxuICAgICAqXG4gICAgICogVGFibGUgcm93cyBhcmUgcmVvcmRlcmVkIGJ5IHVzaW5nIGZsZXhib3ggYW5kIHRoZSBvcmRlciBwcm9wZXJ0eSwgc2luY2UgR21haWwncyBqcyBzZWVtcyBcbiAgICAgKiB0byByZXF1aXJlIHRoZSBET00gbm9kZXMgdG8gcmVtYWluIGluIHRoZWlyIG9yaWdpbmFsIG9yZGVyLiBcbiAgICAgKi9cbiAgICBfYnVuZGxlTWVzc2FnZXMobWVzc2FnZUxpc3QpIHtcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gbWVzc2FnZUxpc3QucXVlcnlTZWxlY3RvcihTZWxlY3RvcnMuVEFCTEVfQk9EWSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmNsYXNzTGlzdC5hZGQoSW5ib3h5Q2xhc3Nlcy5JTkJPWFkpO1xuICAgICAgICB0YWJsZUJvZHkuY2xhc3NMaXN0LmFkZCgnZmxleC10YWJsZS1ib2R5Jyk7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZU5vZGVzID0gWy4uLnRhYmxlQm9keS5xdWVyeVNlbGVjdG9yQWxsKFRhYmxlQm9keVNlbGVjdG9ycy5NRVNTQUdFX05PREVTKV07XG5cbiAgICAgICAgY29uc3QgYnVuZGxlc0J5TGFiZWwgPSB0aGlzLl9ncm91cEJ5TGFiZWwobWVzc2FnZU5vZGVzKTtcbiAgICAgICAgY29uc3Qgc29ydGVkVGFibGVSb3dzID0gdGhpcy5fY2FsY3VsYXRlU29ydGVkVGFibGVSb3dzKG1lc3NhZ2VOb2RlcywgYnVuZGxlc0J5TGFiZWwpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnVuZGxlUm93c0J5TGFiZWwgPSB0aGlzLl9kcmF3VGFibGVSb3dzKHNvcnRlZFRhYmxlUm93cywgdGFibGVCb2R5KTtcbiAgICAgICAgdGhpcy5fZHJhd0J1bmRsZUJveCh0YWJsZUJvZHkpO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGJ1bmRsZVJvd3NCeUxhYmVsKS5mb3JFYWNoKChbbGFiZWwsIGJ1bmRsZVJvd10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1bmRsZSA9IGJ1bmRsZXNCeUxhYmVsW2xhYmVsXTtcbiAgICAgICAgICAgIGJ1bmRsZS5zZXRCdW5kbGVSb3coYnVuZGxlUm93KTtcbiAgICAgICAgICAgIGJ1bmRsZS5zZXRPcmRlcihwYXJzZUludChidW5kbGVSb3cuc3R5bGUub3JkZXIpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5idW5kbGVkTWFpbC5zZXRCdW5kbGVzKGJ1bmRsZXNCeUxhYmVsLCBnZXRDdXJyZW50UGFnZU51bWJlcigpKTtcblxuICAgICAgICB0aGlzLl9hcHBseVN0eWxlcyhtZXNzYWdlTm9kZXMpO1xuICAgICAgICB0aGlzLl9hdHRhY2hIYW5kbGVycyhtZXNzYWdlTm9kZXMsIG1lc3NhZ2VMaXN0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHcm91cCBtZXNzYWdlcyBieSB0aGVpciBsYWJlbHMuXG4gICAgICogUmV0dXJucyBhIG1hcCBvZiBsYWJlbHMgdG8gYnVuZGxlcy5cbiAgICAgKi9cbiAgICBfZ3JvdXBCeUxhYmVsKG1lc3NhZ2VOb2Rlcykge1xuICAgICAgICBjb25zdCBidW5kbGVzQnlMYWJlbCA9IHt9O1xuXG4gICAgICAgIG1lc3NhZ2VOb2Rlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUxhYmVscyA9IHRoaXMuc2VsZWN0aXZlQnVuZGxpbmcuZmlsdGVyKERvbVV0aWxzLmdldExhYmVscyhtZXNzYWdlKSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5faXNTdGFycmVkKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUxhYmVscy5mb3JFYWNoKGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gbC50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVhZiA9IGwucXVlcnlTZWxlY3RvcihTZWxlY3RvcnMuTEFCRUxfTEVBRik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsU3R5bGUgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAgICAgRG9tVXRpbHMuZ2V0Q1NTKGwsIFwiYmFja2dyb3VuZFwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCJmb250LWZhbWlseVwiLCBcImJvcmRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERvbVV0aWxzLmdldENTUyhsZWFmLCBcImJvcmRlci1yYWRpdXNcIiwgXCJjb2xvclwiLCBcInBhZGRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1bmRsZXNCeUxhYmVsW3RdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidW5kbGVzQnlMYWJlbFt0XSA9IG5ldyBCdW5kbGUodCwgbGFiZWxTdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBidW5kbGVzQnlMYWJlbFt0XS5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBidW5kbGVzQnlMYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBlbGVtZW50cyB0aGF0IHdpbGwgYmUgc2hvd24gaW4gdGhlIG1lc3NhZ2UgbGlzdCxcbiAgICAgKiBpbiB0aGUgc2FtZSBvcmRlciB0aGV5IHdpbGwgYmUgZGlzcGxheWVkLlxuICAgICAqIFxuICAgICAqIEVhY2ggaXRlbSBpcyBhbiBvYmplY3Qgd2l0aCAnZWxlbWVudCcgYW5kICd0eXBlJyBmaWVsZHMuIFRoZXkgY2FuIGJlXG4gICAgICogYSBtZXNzYWdlIHJvdywgZGF0ZSBkaXZpZGVyLCBvciBidW5kbGUgcm93LlxuICAgICAqL1xuICAgIF9jYWxjdWxhdGVTb3J0ZWRUYWJsZVJvd3MobWVzc2FnZU5vZGVzLCBidW5kbGVzQnlMYWJlbCkge1xuICAgICAgICBjb25zdCByb3dzID0gdGhpcy5fY2FsY3VsYXRlTWVzc2FnZUFuZEJ1bmRsZVJvd3MobWVzc2FnZU5vZGVzLCBidW5kbGVzQnlMYWJlbCk7XG5cbiAgICAgICAgY29uc3Qgc2FtcGxlRGF0ZSA9IG1lc3NhZ2VOb2Rlcy5sZW5ndGggXG4gICAgICAgICAgICA/IERvbVV0aWxzLmV4dHJhY3REYXRlKG1lc3NhZ2VOb2Rlc1swXSlcbiAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgcmV0dXJuIERhdGVEaXZpZGVyLndpdGhEYXRlRGl2aWRlcnMocm93cywgc2FtcGxlRGF0ZSwgdGhpcy5fZ2V0TGF0ZXN0TWVzc2FnZSk7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZU1lc3NhZ2VBbmRCdW5kbGVSb3dzKG1lc3NhZ2VOb2RlcywgYnVuZGxlc0J5TGFiZWwpIHtcbiAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlTm9kZXNbaV07XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlTGFiZWxzID0gdGhpcy5zZWxlY3RpdmVCdW5kbGluZy5maWx0ZXIoRG9tVXRpbHMuZ2V0TGFiZWxzKG1lc3NhZ2UpKTtcblxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VMYWJlbHMubGVuZ3RoID09PSAwIHx8IHRoaXMuX2lzU3RhcnJlZChtZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgIHJvd3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEVsZW1lbnQuVU5CVU5ETEVEX01FU1NBR0UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lc3NhZ2VMYWJlbHMuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgICAgICBsID0gbC50aXRsZTtcbiAgICAgICAgICAgICAgICBpZiAoIWxhYmVscy5oYXMobCkgJiYgYnVuZGxlc0J5TGFiZWxbbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGJ1bmRsZXNCeUxhYmVsW2xdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRWxlbWVudC5CVU5ETEUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHMuYWRkKGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBtb3N0IHJlY2VudCBtZXNzYWdlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gdGFibGUgcm93LlxuICAgICAqL1xuICAgIF9nZXRMYXRlc3RNZXNzYWdlKHRhYmxlUm93KSB7XG4gICAgICAgIGlmICghdGFibGVSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0YWJsZVJvdy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVsZW1lbnQuQlVORExFOlxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1bmRsZSA9IHRhYmxlUm93LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZS5nZXRNZXNzYWdlcygpWzBdO1xuICAgICAgICAgICAgY2FzZSBFbGVtZW50LlVOQlVORExFRF9NRVNTQUdFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZVJvdy5lbGVtZW50O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBgVW5oYW5kbGVkIGVsZW1lbnQgdHlwZTogJHtlLnR5cGV9YDtcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBEcmF3L2FwcGVuZCB0aGUgdGFibGUgcm93cyB0byB0aGUgdGFibGVCb2R5LCBhbmQgc2V0IHRoZWlyIHZpc3VhbCBvcmRlci5cbiAgICAgKiBcbiAgICAgKiBSZXR1cm5zIGEgbWFwIG9mIG5ld2x5IGNyZWF0ZWQgYnVuZGxlIHJvd3MgYnkgbGFiZWwuXG4gICAgICovXG4gICAgX2RyYXdUYWJsZVJvd3ModGFibGVSb3dzLCB0YWJsZUJvZHkpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGdldEN1cnJlbnRCYXNlVXJsKCk7XG4gICAgICAgIGNvbnN0IGJ1bmRsZVJvd3NCeUxhYmVsID0ge307XG4gICAgICAgIHRhYmxlUm93cy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcmRlciA9IChpICsgMSkgKiBPUkRFUl9JTkNSRU1FTlQ7XG4gICAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRWxlbWVudC5EQVRFX0RJVklERVI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gRGF0ZURpdmlkZXIuZmluZE1lc3NhZ2VzRm9yRGl2aWRlcih0YWJsZVJvd3MsIGkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3RGF0ZURpdmlkZXIoZS5lbGVtZW50LCBvcmRlciwgbWVzc2FnZXMsIHRhYmxlQm9keSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRWxlbWVudC5CVU5ETEU6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1bmRsZSA9IGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVuZGxlUm93ID0gdGhpcy5fZHJhd0J1bmRsZVJvdyhidW5kbGUsIG9yZGVyLCB0YWJsZUJvZHksIGJhc2VVcmwpO1xuICAgICAgICAgICAgICAgICAgICBidW5kbGVSb3dzQnlMYWJlbFtidW5kbGUuZ2V0TGFiZWwoKV0gPSBidW5kbGVSb3c7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRWxlbWVudC5VTkJVTkRMRURfTUVTU0FHRTpcbiAgICAgICAgICAgICAgICAgICAgZS5lbGVtZW50LnN0eWxlLm9yZGVyID0gb3JkZXI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGBVbmhhbmRsZWQgZWxlbWVudCB0eXBlOiAke2UudHlwZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnVuZGxlUm93c0J5TGFiZWw7XG4gICAgfVxuXG4gICAgX2RyYXdCdW5kbGVCb3godGFibGVCb2R5KSB7XG4gICAgICAgIGNvbnN0IGJ1bmRsZUJveCA9IERvbVV0aWxzLmh0bWxUb0VsZW1lbnQoJzxkaXYgY2xhc3M9XCJidW5kbGUtYXJlYVwiPjwvZGl2PicpOyBcbiAgICAgICAgYnVuZGxlQm94LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY2xpY2snLCBcbiAgICAgICAgICAgICgpID0+IHRoaXMuYnVuZGxlVG9nZ2xlci5jbG9zZUFsbEJ1bmRsZXMoKSk7XG4gICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChidW5kbGVCb3gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGRhdGUgZGl2aWRlciBlbGVtZW50IGFuZCBhcHBlbmQgaXQgdG8gdGhlIHRhYmxlQm9keS5cbiAgICAgKi9cbiAgICBfZHJhd0RhdGVEaXZpZGVyKGRpdmlkZXIsIG9yZGVyLCBtZXNzYWdlcywgdGFibGVCb2R5KSB7XG4gICAgICAgIGNvbnN0IGRpdmlkZXJOb2RlID0gRGF0ZURpdmlkZXIuY3JlYXRlKGRpdmlkZXIsIG9yZGVyLCBtZXNzYWdlcyk7XG4gICAgICAgIHRhYmxlQm9keS5hcHBlbmQoZGl2aWRlck5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGJ1bmRsZSByb3cgZWxlbWVudCBhbmQgYXBwZW5kIGl0IHRvIHRoZSB0YWJsZUJvZHkuXG4gICAgICovXG4gICAgX2RyYXdCdW5kbGVSb3coYnVuZGxlLCBvcmRlciwgdGFibGVCb2R5LCBiYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYnVuZGxlLmdldE1lc3NhZ2VzKCk7XG4gICAgICAgIGNvbnN0IGhhc1VucmVhZE1lc3NhZ2VzID0gbWVzc2FnZXMuc29tZSh0aGlzLl9pc1VucmVhZE1lc3NhZ2UpO1xuXG4gICAgICAgIGNvbnN0IGJ1bmRsZVJvdyA9IEJ1bmRsZVJvdy5jcmVhdGUoXG4gICAgICAgICAgICBidW5kbGUuZ2V0TGFiZWwoKSwgXG4gICAgICAgICAgICBidW5kbGUuZ2V0U3R5bGUoKSxcbiAgICAgICAgICAgIG9yZGVyLCBcbiAgICAgICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICAgICAgaGFzVW5yZWFkTWVzc2FnZXMsIFxuICAgICAgICAgICAgdGhpcy5idW5kbGVUb2dnbGVyLnRvZ2dsZUJ1bmRsZSxcbiAgICAgICAgICAgIGJhc2VVcmwpO1xuICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQoYnVuZGxlUm93KTtcblxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG0gPT4gbS5jbGFzc0xpc3QuYWRkKEluYm94eUNsYXNzZXMuQlVORExFRF9NRVNTQUdFKSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1bmRsZVJvdztcbiAgICB9XG5cbiAgICBfaXNVbnJlYWRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKEdtYWlsQ2xhc3Nlcy5VTlJFQUQpO1xuICAgIH1cblxuICAgIF9pc1N0YXJyZWQobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5xdWVyeVNlbGVjdG9yKGAuJHtHbWFpbENsYXNzZXMuU1RBUlJFRH1gKTtcbiAgICB9XG5cbiAgICBfYXBwbHlTdHlsZXMobWVzc2FnZU5vZGVzKSB7XG4gICAgICAgIHRoaXMuaW5ib3h5U3R5bGVyLm1hcmtTZWxlY3RlZEJ1bmRsZXMoKTtcbiAgICAgICAgdGhpcy5pbmJveHlTdHlsZXIuZGlzYWJsZUJ1bGtBcmNoaXZlSWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBfYXR0YWNoSGFuZGxlcnMobWVzc2FnZU5vZGVzLCBtZXNzYWdlTGlzdCkge1xuICAgICAgICAvLyBFbnN1cmUgc2hpZnQrY2xpY2sgc2VsZWN0aW9uIHdvcmtzXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3JzLkNIRUNLQk9YRVMpXG4gICAgICAgICAgICAuZm9yRWFjaChcbiAgICAgICAgICAgICAgICBuID0+IG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnF1aWNrU2VsZWN0SGFuZGxlci5oYW5kbGVDaGVja2JveENsaWNrKSk7XG5cbiAgICAgICAgLy8gQ2xvc2UgYnVuZGxlcyB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgYW55IG9wZW4gYnVuZGxlXG4gICAgICAgIG1lc3NhZ2VMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAvLyAjNjMgLSBlLnRhcmdldCBtYXkgaGF2ZSBiZWVuIHJlbW92ZWQgYmVmb3JlIGV2ZW50IHByb3BhZ2F0ZXMgdG8gbWVzc2FnZUxpc3RcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGUudGFyZ2V0KSAmJiAhZS50YXJnZXQuY2xvc2VzdCgndHInKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVuZGxlVG9nZ2xlci5jbG9zZUFsbEJ1bmRsZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlU2VsZWN0SGFuZGxlci5zdGFydFdhdGNoaW5nKG1lc3NhZ2VOb2Rlcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdW5kbGVyO1xuIiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCBEYXRlRGl2aWRlciBmcm9tICcuLi9jb21wb25lbnRzL0RhdGVEaXZpZGVyJztcblxuaW1wb3J0IFBpbm5lZE1lc3NhZ2VMaXN0V2F0Y2hlciBmcm9tICcuLi9oYW5kbGVycy9QaW5uZWRNZXNzYWdlTGlzdFdhdGNoZXInO1xuXG5pbXBvcnQgeyBcbiAgICBJbmJveHlDbGFzc2VzLFxuICAgIFNlbGVjdG9ycywgXG4gICAgVGFibGVCb2R5U2VsZWN0b3JzLFxuICAgIEVsZW1lbnQsXG59IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcbmltcG9ydCBEb21VdGlscyBmcm9tICcuLi91dGlsL0RvbVV0aWxzJztcblxuLyoqXG4gKiBBZGRzIGRhdGUgZGl2aWRlcnMgdG8gYSBtZXNzYWdlIGxpc3QuIFxuICpcbiAqIE1hbnkgcGFydHMgb2YgdGhlIGltcGxlbWVudGF0aW9uIGFyZSBzaW1pbGFyIHRvIEJ1bmRsZXIuanMsIHdpdGggc29tZSBzbGlnaHQgZGlmZmVyZW5jZXMuXG4gKi9cbmNsYXNzIERhdGVHcm91cGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0ZURpdmlkZXJzID0gdGhpcy5yZWZyZXNoRGF0ZURpdmlkZXJzLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5waW5uZWRNZXNzYWdlTGlzdFdhdGNoZXIgPSBuZXcgUGlubmVkTWVzc2FnZUxpc3RXYXRjaGVyKHRoaXMucmVmcmVzaERhdGVEaXZpZGVycyk7XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIEluc2VydCBkYXRlIGRpdmlkZXJzIG9udG8gdGhlIGN1cnJlbnQgZGlzcGxheWVkIG1lc3NhZ2UgbGlzdC5cbiAgICAgKi9cbiAgICByZWZyZXNoRGF0ZURpdmlkZXJzKCkge1xuICAgICAgICBjb25zdCBwb3NzaWJsZU1lc3NhZ2VMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3JzLlBPU1NJQkxFX01FU1NBR0VfTElTVFMpO1xuICAgICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IHBvc3NpYmxlTWVzc2FnZUxpc3RzLmxlbmd0aCA/IHBvc3NpYmxlTWVzc2FnZUxpc3RzLml0ZW0oMSkgOiBudWxsO1xuXG4gICAgICAgIGlmICghbWVzc2FnZUxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGlubmVkTWVzc2FnZUxpc3RXYXRjaGVyLmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICB0aGlzLl9yZWZyZXNoRGF0ZURpdmlkZXJzKG1lc3NhZ2VMaXN0KTtcbiAgICAgICAgdGhpcy5faGlkZUluYm94TGFiZWxzKG1lc3NhZ2VMaXN0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGlubmVkTWVzc2FnZUxpc3RXYXRjaGVyLm9ic2VydmUoKTtcbiAgICB9XG5cbiAgICBfcmVmcmVzaERhdGVEaXZpZGVycyhtZXNzYWdlTGlzdCkge1xuICAgICAgICBjb25zdCB0YWJsZUJvZHkgPSBtZXNzYWdlTGlzdC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5UQUJMRV9CT0RZKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuY2xhc3NMaXN0LmFkZChJbmJveHlDbGFzc2VzLklOQk9YWSk7XG4gICAgICAgIHRhYmxlQm9keS5jbGFzc0xpc3QuYWRkKCdmbGV4LXRhYmxlLWJvZHknKTtcblxuICAgICAgICAvLyBSZW1vdmUgYWxsIHByZS1leGlzdGluZyBkYXRlIHJvd3NcbiAgICAgICAgdGFibGVCb2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXRlLXJvdycpLmZvckVhY2gobiA9PiBuLnJlbW92ZSgpKTtcblxuICAgICAgICBjb25zdCBtZXNzYWdlTm9kZXMgPSBbLi4udGFibGVCb2R5LnF1ZXJ5U2VsZWN0b3JBbGwoVGFibGVCb2R5U2VsZWN0b3JzLk1FU1NBR0VfTk9ERVMpXTtcblxuICAgICAgICBjb25zdCBzYW1wbGVEYXRlID0gbWVzc2FnZU5vZGVzLmxlbmd0aCBcbiAgICAgICAgICAgID8gRG9tVXRpbHMuZXh0cmFjdERhdGUobWVzc2FnZU5vZGVzWzBdKVxuICAgICAgICAgICAgOiAnJztcblxuICAgICAgICBjb25zdCBtZXNzYWdlUm93cyA9IG1lc3NhZ2VOb2Rlcy5tYXAobSA9PiAoe1xuICAgICAgICAgICAgZWxlbWVudDogbSxcbiAgICAgICAgICAgIHR5cGU6IEVsZW1lbnQuVU5CVU5ETEVEX01FU1NBR0UsXG4gICAgICAgIH0pKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IERhdGVEaXZpZGVyLndpdGhEYXRlRGl2aWRlcnMobWVzc2FnZVJvd3MsIHNhbXBsZURhdGUpO1xuICAgICAgICB0aGlzLl9kcmF3Um93cyhyb3dzLCB0YWJsZUJvZHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBkYXRlIGRpdmlkZXJzIHRvIHRoZSBwYWdlLCBhbmQgc2V0IG9yZGVyIG51bWJlcnMgZm9yIGRhdGUgZGl2aWRlcnMgYW5kIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIF9kcmF3Um93cyh0YWJsZVJvd3MsIHRhYmxlQm9keSkge1xuICAgICAgICB0YWJsZVJvd3MuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEVsZW1lbnQuREFURV9ESVZJREVSOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlcyA9IERhdGVEaXZpZGVyLmZpbmRNZXNzYWdlc0ZvckRpdmlkZXIodGFibGVSb3dzLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2aWRlck5vZGUgPSBEYXRlRGl2aWRlci5jcmVhdGUoZS5lbGVtZW50LCBpLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmQoZGl2aWRlck5vZGUpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRWxlbWVudC5VTkJVTkRMRURfTUVTU0FHRTpcbiAgICAgICAgICAgICAgICAgICAgZS5lbGVtZW50LnN0eWxlLm9yZGVyID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgYFVuaGFuZGxlZCBlbGVtZW50IHR5cGU6ICR7ZS50eXBlfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9oaWRlSW5ib3hMYWJlbHMobWVzc2FnZUxpc3QpIHtcbiAgICAgICAgbWVzc2FnZUxpc3QucXVlcnlTZWxlY3RvckFsbChTZWxlY3RvcnMuSU5CT1hfTEFCRUwpXG4gICAgICAgICAgICAuZm9yRWFjaChsID0+IGwucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcbiAgICB9XG59IFxuXG5leHBvcnQgZGVmYXVsdCBEYXRlR3JvdXBlcjsiLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IHsgXG4gICAgR21haWxDbGFzc2VzLFxuICAgIFNlbGVjdG9ycyxcbn0gZnJvbSAnLi4vdXRpbC9Db25zdGFudHMnO1xuXG4vKipcbiAqIEFwcGxpZXMgaW5ib3h5IHN0eWxpbmcuXG4gKi9cbmNsYXNzIEluYm94eVN0eWxlciB7XG4gICAgY29uc3RydWN0b3IoYnVuZGxlZE1haWwpIHtcbiAgICAgICAgdGhpcy5idW5kbGVkTWFpbCA9IGJ1bmRsZWRNYWlsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IFwic2VsZWN0ZWRcIiBzdHlsaW5nIChpLmUuIGNoZWNrZWQpIHRvIGFsbCBidW5kbGVzIHRoYXQgaGF2ZSBhbnkgbWVzc2FnZXMgdGhhdFxuICAgICAqIGFyZSBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBtYXJrU2VsZWN0ZWRCdW5kbGVzKCkge1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuYnVuZGxlZE1haWwuZ2V0QWxsQnVuZGxlcygpKS5mb3JFYWNoKHRoaXMuX21hcmtTZWxlY3RlZEJ1bmRsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbHkgXCJzZWxlY3RlZFwiIHN0eWxpbmcgKGkuZS4gY2hlY2tlZCkgdG8gYWxsIGJ1bmRsZXMgd2l0aCB0aGUgZ2l2ZW4gbGFiZWxzLCB0aGF0IGhhdmVcbiAgICAgKiBhbnkgbWVzc2FnZXMgdGhhdCBhcmUgc2VsZWN0ZWQuXG4gICAgICovXG4gICAgbWFya1NlbGVjdGVkQnVuZGxlc0ZvcihsYWJlbHMpIHtcbiAgICAgICAgbGFiZWxzLmZvckVhY2gobCA9PiB7XG4gICAgICAgICAgICBjb25zdCBidW5kbGUgPSB0aGlzLmJ1bmRsZWRNYWlsLmdldEJ1bmRsZShsKTtcbiAgICAgICAgICAgIGlmICghYnVuZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tYXJrU2VsZWN0ZWRCdW5kbGUoYnVuZGxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbHkgXCJzZWxlY3RlZFwiIHN0eWxpbmcgdG8gdGhlIGJ1bmRsZS5cbiAgICAgKi9cbiAgICBfbWFya1NlbGVjdGVkQnVuZGxlKGJ1bmRsZSkge1xuICAgICAgICBjb25zdCBoYXNTZWxlY3RlZE1lc3NhZ2VzID0gYnVuZGxlLmdldE1lc3NhZ2VzKClcbiAgICAgICAgICAgIC5zb21lKG0gPT4gbS5jbGFzc0xpc3QuY29udGFpbnMoR21haWxDbGFzc2VzLlNFTEVDVEVEKSk7XG5cbiAgICAgICAgaWYgKGhhc1NlbGVjdGVkTWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGJ1bmRsZS5nZXRCdW5kbGVSb3coKS5jbGFzc0xpc3QuYWRkKEdtYWlsQ2xhc3Nlcy5TRUxFQ1RFRCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBidW5kbGUuZ2V0QnVuZGxlUm93KCkuY2xhc3NMaXN0LnJlbW92ZShHbWFpbENsYXNzZXMuU0VMRUNURUQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggYnVuZGxlLCBkaXNhYmxlIGJ1bGstYXJjaGl2aW5nIGlmIGFueSBtZXNzYWdlIG91dHNpZGUgb2YgaXRzIGJ1bmRsZSBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBkaXNhYmxlQnVsa0FyY2hpdmVJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRNZXNzYWdlcyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9ycy5TRUxFQ1RFRCkpO1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuYnVuZGxlZE1haWwuZ2V0QWxsQnVuZGxlcygpKS5mb3JFYWNoKGJ1bmRsZSA9PiBcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJ1bGtBcmNoaXZlQnV0dG9uKGJ1bmRsZSwgc2VsZWN0ZWRNZXNzYWdlcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZS9kaXNhYmxlIHRoZSBidWxrIGFyY2hpdmUgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gYnVuZGxlLlxuICAgICAqL1xuICAgIF91cGRhdGVCdWxrQXJjaGl2ZUJ1dHRvbihidW5kbGUsIHNlbGVjdGVkTWVzc2FnZXMpIHtcbiAgICAgICAgY29uc3QgYnVuZGxlZE1lc3NhZ2VJZHMgPSBuZXcgU2V0KGJ1bmRsZS5nZXRNZXNzYWdlcygpLm1hcChtID0+IG0uaWQpKTtcbiAgICAgICAgY29uc3QgYWxsU2VsZWN0ZWRNZXNzYWdlc0luQnVuZGxlID0gIXNlbGVjdGVkTWVzc2FnZXMuc29tZShcbiAgICAgICAgICAgIG0gPT4gIWJ1bmRsZWRNZXNzYWdlSWRzLmhhcyhtLmlkKSk7XG5cbiAgICAgICAgY29uc3QgYnVsa0FyY2hpdmVCdXR0b24gPSBidW5kbGUuZ2V0QnVuZGxlUm93KCkucXVlcnlTZWxlY3RvcignLmFyY2hpdmUtYnVuZGxlJyk7XG4gICAgICAgIGlmIChhbGxTZWxlY3RlZE1lc3NhZ2VzSW5CdW5kbGUpIHtcbiAgICAgICAgICAgIGJ1bGtBcmNoaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBidWxrQXJjaGl2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmJveHlTdHlsZXI7IiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbi8qKlxuICogSWRlbnRpZmllcyB0aGUgbGFiZWxzIHRoYXQgaGF2ZSBidW5kbGluZyBlbmFibGVkLCBhY2NvcmRpbmcgdG8gdGhlIHVzZXIncyBvcHRpb25zLlxuICogQnkgZGVmYXVsdCwgYWxsIGxhYmVscyBhcmUgYnVuZGxlZC5cbiAqL1xuY2xhc3MgU2VsZWN0aXZlQnVuZGxpbmcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydleGNsdWRlJywgJ2xhYmVscyddLCAoeyBleGNsdWRlID0gdHJ1ZSwgbGFiZWxzID0gW10gfSkgPT4ge1xuICAgICAgICAgICAgc2VsZi5leGNsdWRlID0gZXhjbHVkZTtcbiAgICAgICAgICAgIHNlbGYubGFiZWxzID0gbmV3IFNldChsYWJlbHMubWFwKHMgPT4gcy50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlcihtZXNzYWdlTGFiZWxzKSB7XG4gICAgICAgIGlmICh0aGlzLmV4Y2x1ZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlTGFiZWxzLmZpbHRlcihsID0+ICF0aGlzLmxhYmVscy5oYXMobC50aXRsZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZUxhYmVscy5maWx0ZXIobCA9PiB0aGlzLmxhYmVscy5oYXMobC50aXRsZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWx0ZXJTdHJpbmdzKG1lc3NhZ2VMYWJlbHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKG1lc3NhZ2VMYWJlbHMpLm1hcChsID0+IGwudGl0bGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aXZlQnVuZGxpbmc7XG4iLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IERvbVV0aWxzIGZyb20gJy4uL3V0aWwvRG9tVXRpbHMnO1xuaW1wb3J0IHtcbiAgICBHbWFpbENsYXNzZXMsXG4gICAgSW5ib3h5Q2xhc3NlcyxcbiAgICBTZWxlY3RvcnMsXG59IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcblxuLyoqXG4gKiBDcmVhdGUgYnVsayBhcmNoaXZlIGJ1dHRvbiBmb3IgYXJjaGl2aW5nIHRoZSBnaXZlbiBtZXNzYWdlcywgd2hpY2ggc2hvdWxkIGJlIGluIHRoZSBzYW1lIGJ1bmRsZS5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIF9jcmVhdGUoKCkgPT4gX3NlbGVjdE1lc3NhZ2VzKG1lc3NhZ2VzKSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGUoc2VsZWN0TWVzc2FnZXNGdW5jdGlvbikge1xuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJjaGl2ZS1idW5kbGUgJHtHbWFpbENsYXNzZXMuQVJDSElWRV9CVVRUT059XCI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgO1xuXG4gICAgY29uc3QgYXJjaGl2ZVNwYW4gPSBEb21VdGlscy5odG1sVG9FbGVtZW50KGh0bWwpO1xuICAgIGFyY2hpdmVTcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiAge1xuICAgICAgICBpZiAoYXJjaGl2ZVNwYW4uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX2FyY2hpdmVNZXNzYWdlcyhzZWxlY3RNZXNzYWdlc0Z1bmN0aW9uKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcmNoaXZlU3Bhbjtcbn1cblxuZnVuY3Rpb24gX2FyY2hpdmVNZXNzYWdlcyhzZWxlY3RNZXNzYWdlc0Z1bmN0aW9uKSB7XG4gICAgY29uc3QgdG9vbGJhckFyY2hpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5UT09MQkFSX0FSQ0hJVkVfQlVUVE9OKTtcblxuICAgIGNvbnN0IGJ1dHRvbklzVmlzaWJsZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb24sIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoX2lzQ2xpY2thYmxlKHRvb2xiYXJBcmNoaXZlQnV0dG9uKSkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKFxuICAgICAgICAgICAgdG9vbGJhckFyY2hpdmVCdXR0b24ucGFyZW50Tm9kZSwgXG4gICAgICAgICAgICB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogZmFsc2UsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RNZXNzYWdlcyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2VsZWN0TWVzc2FnZXNGdW5jdGlvbigpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG5cbiAgICBQcm9taXNlLmFsbChbYnV0dG9uSXNWaXNpYmxlLCBzZWxlY3RNZXNzYWdlc10pLnRoZW4oKCkgPT4gX3NpbXVsYXRlQ2xpY2sodG9vbGJhckFyY2hpdmVCdXR0b24pKTtcbn1cblxuLyoqXG4gKiBTZWxlY3QgYWxsIGdpdmVuIG1lc3NhZ2VzLlxuICovXG5mdW5jdGlvbiBfc2VsZWN0TWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICBmb3IgKGxldCBpID0gbWVzc2FnZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3hOb2RlID0gbWVzc2FnZXNbaV0ucXVlcnlTZWxlY3RvcihTZWxlY3RvcnMuTUVTU0FHRV9DSEVDS0JPWCk7XG4gICAgICAgIGlmICghRG9tVXRpbHMuaXNDaGVja2VkKGNoZWNrYm94Tm9kZSkpIHtcbiAgICAgICAgICAgIGNoZWNrYm94Tm9kZS5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfaXNDbGlja2FibGUoYnV0dG9uKSB7XG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoYnV0dG9uLnBhcmVudE5vZGUpLmRpc3BsYXkgIT09ICdub25lJyAmJiBcbiAgICAgICAgYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpICE9PSAndHJ1ZSc7XG59XG5cbmZ1bmN0aW9uIF9zaW11bGF0ZUNsaWNrKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkaXNwYXRjaE1vdXNlRXZlbnQgPSBmdW5jdGlvbih0YXJnZXQsIG5hbWUpIHtcbiAgICAgICAgY29uc3QgZSA9IG5ldyBNb3VzZUV2ZW50KG5hbWUsIHtcbiAgICAgICAgICAgIHZpZXc6IHdpbmRvdyxcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9O1xuICAgIGRpc3BhdGNoTW91c2VFdmVudChlbGVtZW50LCAnbW91c2VvdmVyJyk7XG4gICAgZGlzcGF0Y2hNb3VzZUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKTtcbiAgICBkaXNwYXRjaE1vdXNlRXZlbnQoZWxlbWVudCwgJ2NsaWNrJyk7XG4gICAgZGlzcGF0Y2hNb3VzZUV2ZW50KGVsZW1lbnQsICdtb3VzZXVwJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCBCdWxrQXJjaGl2ZUJ1dHRvbiBmcm9tICcuL0J1bGtBcmNoaXZlQnV0dG9uJztcblxuaW1wb3J0IE1lc3NhZ2VQYWdlVXRpbHMgZnJvbSAnLi4vdXRpbC9NZXNzYWdlUGFnZVV0aWxzJztcbmltcG9ydCBEb21VdGlscyBmcm9tICcuLi91dGlsL0RvbVV0aWxzJztcbmltcG9ydCB7IFxuICAgIEdtYWlsQ2xhc3NlcywgXG4gICAgSW5ib3h5Q2xhc3NlcyxcbiAgICBTZWxlY3RvcnMsXG59IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcblxuaW1wb3J0IFJHQkNvbG9yIGZyb20gJy4uL2NvbnRhaW5lcnMvQ29sb3InO1xuXG5jb25zdCBNQVhfTUVTU0FHRV9DT1VOVCA9IDI1O1xuXG4vKipcbiAqIENyZWF0ZSBhIHRhYmxlIHJvdyBmb3IgYSBidW5kbGUsIHRvIGJlIHNob3duIGluIHRoZSBsaXN0IG9mIG1lc3NhZ2VzLiBcbiAqL1xuZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCBzdHlsZSwgb3JkZXIsIG1lc3NhZ2VzLCBoYXNVbnJlYWQsIHRvZ2dsZUJ1bmRsZSwgYmFzZVVybCkge1xuICAgIGNvbnN0IGRpc3BsYXllZE1lc3NhZ2VDb3VudCA9IG1lc3NhZ2VzLmxlbmd0aCA+PSBNQVhfTUVTU0FHRV9DT1VOVCBcbiAgICAgICAgPyBgJHtNQVhfTUVTU0FHRV9DT1VOVH0rYCBcbiAgICAgICAgOiBtZXNzYWdlcy5sZW5ndGg7XG4gICAgY29uc3QgdW5yZWFkQ2xhc3MgPSBoYXNVbnJlYWQgPyBHbWFpbENsYXNzZXMuVU5SRUFEIDogR21haWxDbGFzc2VzLlJFQUQ7XG5cbiAgICBsZXQgc3BhY2VyQ2xhc3MgPSAnJztcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3RvcnMuSU1QT1JUQU5DRV9NQVJLRVIpKSB7XG4gICAgICAgIHNwYWNlckNsYXNzID0gR21haWxDbGFzc2VzLklNUE9SVEFOQ0VfTUFSS0VSO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5QRVJTT05BTF9MRVZFTF9JTkRJQ0FUT1IpKSB7XG4gICAgICAgIHNwYWNlckNsYXNzID0gR21haWxDbGFzc2VzLlBFUlNPTkFMX0xFVkVMX0lORElDQVRPUjtcbiAgICB9XG5cbiAgICBjb25zdCBzZW5kZXJzVGV4dCA9IF9nZW5lcmF0ZVNlbmRlcnNUZXh0KG1lc3NhZ2VzKS5qb2luKCcsICcpO1xuXG4gICAgY29uc3Qgc25vb3plZFRleHQgPSBtZXNzYWdlc1swXS5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5NRVNTQUdFX1NOT09aRURfVEVYVCk7XG4gICAgY29uc3QgbGF0ZXN0RGF0ZSA9IHNub296ZWRUZXh0XG4gICAgICAgID8gc25vb3plZFRleHQuaW5uZXJUZXh0XG4gICAgICAgIDogbWVzc2FnZXNbMF0ucXVlcnlTZWxlY3RvcihTZWxlY3RvcnMuTUVTU0FHRV9EQVRFX1NQQU4pLmlubmVyVGV4dDtcblxuICAgIGNvbnN0IGxhdGVzdElzVW5yZWFkQ2xhc3MgPSBtZXNzYWdlc1swXS5jbGFzc0xpc3QuY29udGFpbnMoR21haWxDbGFzc2VzLlVOUkVBRCkgPyAndW5yZWFkJyA6ICcnO1xuICAgIGNvbnN0IGxhdGVzdElzU25vb3plZENsYXNzID0gc25vb3plZFRleHQgPyBHbWFpbENsYXNzZXMuU05PT1pFRCA6ICcnO1xuXG4gICAgY29uc3QgaWNvblN0eWxlID0gX2NvbXBvc2VJY29uU3R5bGUoc3R5bGUpO1xuICAgIGNvbnN0IGxhYmVsU3R5bGUgPSBfY29tcG9zZUxhYmVsU3R5bGUoc3R5bGUpO1xuICAgIGNvbnN0IGJhY2tncm91bmRTdHlsZSA9IF9jb21wb3NlQmFja2dyb3VuZFN0eWxlKHN0eWxlKTtcblxuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgIDx0ciBjbGFzcz1cIiR7R21haWxDbGFzc2VzLlJPV30gJHtJbmJveHlDbGFzc2VzLkJVTkRMRV9ST1d9ICR7dW5yZWFkQ2xhc3N9XCIgJHtiYWNrZ3JvdW5kU3R5bGV9PlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiJHtHbWFpbENsYXNzZXMuQ0VMTH0gUEZcIj48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiJHtHbWFpbENsYXNzZXMuQ0VMTH0gb1oteDNcIj48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiJHtHbWFpbENsYXNzZXMuQ0VMTH0gYnVuZGxlLWljb25cIj48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiJHtHbWFpbENsYXNzZXMuQ0VMTH0geVhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVuZGxlLWFuZC1jb3VudFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1bmRsZS1sYWJlbFwiICR7bGFiZWxTdHlsZX0+JHtsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnVuZGxlLWNvdW50XCI+KCR7ZGlzcGxheWVkTWVzc2FnZUNvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiJHtHbWFpbENsYXNzZXMuQ0VMTH0gJHtHbWFpbENsYXNzZXMuU1VCSkVDVF9DRUxMfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnVuZGxlLXNlbmRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtzZW5kZXJzVGV4dH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiJHtHbWFpbENsYXNzZXMuQ0VMTH0gZmxleC1ncm93XCI+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICBgO1xuXG4gICAgY29uc3QgYnVsa0FyY2hpdmVCdXR0b24gPSBCdWxrQXJjaGl2ZUJ1dHRvbi5jcmVhdGUobWVzc2FnZXMpO1xuICAgIGNvbnN0IGJ1bGtBcmNoaXZlVGQgPSBEb21VdGlscy5odG1sVG9FbGVtZW50KGA8dGQgY2xhc3M9XCIke0dtYWlsQ2xhc3Nlcy5DRUxMfVwiPjwvdGQ+YCk7XG4gICAgYnVsa0FyY2hpdmVUZC5hcHBlbmRDaGlsZChidWxrQXJjaGl2ZUJ1dHRvbik7XG5cbiAgICBjb25zdCBsYWJlbFVybCA9IGxhYmVsXG4gICAgICAgIC5zcGxpdCgnICcpLmpvaW4oJy0nKVxuICAgICAgICAuc3BsaXQoJy8nKS5qb2luKCclMkYnKVxuICAgICAgICAuc3BsaXQoJyYnKS5qb2luKCctJyk7XG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVVybH0jc2VhcmNoL2xhYmVsJTNBSW5ib3grbGFiZWwlM0Eke2xhYmVsVXJsfWA7XG4gICAgY29uc3Qgdmlld0FsbEJ1dHRvbkh0bWwgPSBgXG4gICAgICAgIDx0ZCBjbGFzcz1cIiR7R21haWxDbGFzc2VzLkNFTEx9XCI+XG4gICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICBocmVmPVwiJHt1cmx9XCIgXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ2aWV3LWFsbC1saW5rXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlldy1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgVmlldyBhbGxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC90ZD5cbiAgICBgO1xuXG4gICAgY29uc3QgYnVuZGxlRGF0ZUh0bWwgPSBgXG4gICAgICAgIDx0ZCBjbGFzcz1cImJ1bmRsZS1kYXRlLWNlbGwgJHtzbm9vemVkVGV4dCA/ICcnIDogR21haWxDbGFzc2VzLkRBVEVfQ0VMTH0gJHtHbWFpbENsYXNzZXMuQ0VMTH1cIj5cbiAgICAgICAgPC90ZD5cbiAgICBgO1xuXG4gICAgY29uc3QgZWwgPSBEb21VdGlscy5odG1sVG9FbGVtZW50KGh0bWwpO1xuICAgIGVsLmFwcGVuZENoaWxkKGJ1bGtBcmNoaXZlVGQpO1xuICAgIGVsLmFwcGVuZENoaWxkKERvbVV0aWxzLmh0bWxUb0VsZW1lbnQoYnVuZGxlRGF0ZUh0bWwpKTtcbiAgICBlbC5hcHBlbmRDaGlsZChEb21VdGlscy5odG1sVG9FbGVtZW50KHZpZXdBbGxCdXR0b25IdG1sKSk7XG5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoYC4ke0luYm94eUNsYXNzZXMuVklFV19BTExfTElOS31gKSAmJiBcbiAgICAgICAgICAgICFlLnRhcmdldC5tYXRjaGVzKCcudmlldy1hbGwnKSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRvZ2dsZUJ1bmRsZShsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIERvbid0IHByb3BhZ2F0ZSB0byBoYW5kbGVyIGZvciBjbGljay1vdXRzaWRlIHRvIGNsb3NlIGJ1bmRsZVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICAgIGVsLnN0eWxlLm9yZGVyID0gb3JkZXI7XG5cbiAgICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIF9jb21wb3NlSWNvblN0eWxlKGdtYWlsTGFiZWxTdHlsZSkge1xuICAgIGNvbnN0IGMwID0gbmV3IFJHQkNvbG9yKGdtYWlsTGFiZWxTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0pO1xuICAgIGNvbnN0IGljb25TdHlsZSA9IERvbVV0aWxzLnNsaWNlKFxuICAgICAgICBnbWFpbExhYmVsU3R5bGUsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImJvcmRlci1yYWRpdXNcIlxuICAgICk7XG4gICAgaWNvblN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IE9iamVjdC5hc3NpZ24oe30sIGMwLCB7X2E6IDAuMzN9KTtcbiAgICByZXR1cm4gRG9tVXRpbHMuc3R5bGVGb3IoaWNvblN0eWxlKTtcbn1cblxuZnVuY3Rpb24gX2NvbXBvc2VMYWJlbFN0eWxlKGdtYWlsTGFiZWxTdHlsZSkge1xuICAgIC8vIHJldHVybiBgc3R5bGU9XCJjb2xvcjogYCArIGdtYWlsTGFiZWxTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gKyBgOyBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTsgYmFja2dyb3VuZC1jb2xvcjogYCArIGdtYWlsTGFiZWxTdHlsZVtcImNvbG9yXCJdICsgYFwiYDsgXG4gICAgcmV0dXJuIERvbVV0aWxzLnN0eWxlRm9yKGdtYWlsTGFiZWxTdHlsZSk7XG59XG5cbmZ1bmN0aW9uIF9jb21wb3NlQmFja2dyb3VuZFN0eWxlKGdtYWlsTGFiZWxTdHlsZSkge1xuICAgIGNvbnN0IGMwID0gbmV3IFJHQkNvbG9yKGdtYWlsTGFiZWxTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0pO1xuICAgIGNvbnN0IGcxID0gT2JqZWN0LmFzc2lnbih7fSwgYzAsIHtfYTogLjMzfSk7XG4gICAgY29uc3QgZzIgPSBPYmplY3QuYXNzaWduKHt9LCBjMCwge19hOiAuMTF9KTtcbiAgICBjb25zdCBnMyA9IG5ldyBSR0JDb2xvcigwLDAsMCwwKTtcbiAgICByZXR1cm4gYHN0eWxlPVwiYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC41dHVybiwgJHtnMX0sICR7ZzJ9LCAke2czfSwgJHtnM30pO1wiYDtcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlU2VuZGVyc1RleHQobWVzc2FnZXMpIHtcbiAgICBjb25zdCBkZWR1cGVkU2VuZGVycyA9IFtdO1xuICAgIGNvbnN0IHVucmVhZFN0YXR1c0J5U2VuZGVycyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbaV07XG4gICAgICAgIGNvbnN0IHNlbmRlcnNFbGVtZW50cyA9IFsuLi5tZXNzYWdlLnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3JzLlNFTkRFUlMpXTs7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBqID0gc2VuZGVyc0VsZW1lbnRzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICBjb25zdCBzZW5kZXIgPSBzZW5kZXJzRWxlbWVudHNbal0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgaWYgKCF1bnJlYWRTdGF0dXNCeVNlbmRlcnMuaGFzT3duUHJvcGVydHkoc2VuZGVyKSkge1xuICAgICAgICAgICAgICAgIGRlZHVwZWRTZW5kZXJzLnB1c2goc2VuZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlzVW5yZWFkID0gc2VuZGVyc0VsZW1lbnRzW2pdLmNsYXNzTGlzdC5jb250YWlucyhHbWFpbENsYXNzZXMuVU5SRUFEX1NFTkRFUik7XG4gICAgICAgICAgICB1bnJlYWRTdGF0dXNCeVNlbmRlcnNbc2VuZGVyXSA9ICEhdW5yZWFkU3RhdHVzQnlTZW5kZXJzW3NlbmRlcl0gfHwgaXNVbnJlYWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVkdXBlZFNlbmRlcnMubWFwKHMgPT4gXG4gICAgICAgIHVucmVhZFN0YXR1c0J5U2VuZGVyc1tzXSA/IGA8c3BhbiBjbGFzcz1cInVucmVhZC1zZW5kZXJcIj4ke3N9PC9zcGFuPmAgOiBzKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IGNyZWF0ZSB9O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvc2VCdXR0b24oKSB7XG4gICAgY29uc3QgZmxvYXRpbmdDb21wb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmbG9hdGluZ0NvbXBvc2VCdXR0b24uY2xhc3NOYW1lID0gXCJmbG9hdGluZy1jb21wb3NlXCI7XG4gICAgZmxvYXRpbmdDb21wb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBUT0RPOiBSZXBsYWNlIGFsbCBvZiB0aGUgYmVsb3cgd2l0aCBnbWFpbC5jb21wb3NlLnN0YXJ0X2NvbXBvc2UoKSB2aWEgdGhlIEdtYWlsLmpzIGxpYlxuICAgICAgY29uc3QgY29tcG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVC1JLlQtSS1LRS5MM1wiKTtcbiAgICAgIGNvbXBvc2VCdXR0b24uY2xpY2soKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZsb2F0aW5nQ29tcG9zZUJ1dHRvbik7XG59XG5cbiIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgQnVsa0FyY2hpdmVCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9CdWxrQXJjaGl2ZUJ1dHRvbic7XG5cbmltcG9ydCBEb21VdGlscyBmcm9tICcuLi91dGlsL0RvbVV0aWxzJztcbmltcG9ydCB7XG4gICAgU2VsZWN0b3JzLFxuICAgIEVsZW1lbnQsXG59IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBjcmVhdGluZyByb3dzIHRoYXQgZGl2aWRlIG1lc3NhZ2VzIGludG8gZ3JvdXBzIGJ5IGRhdGUsIFxuICogZXguIFwiVG9kYXlcIiwgXCJZZXN0ZXJkYXlcIiwgXCJUaGlzIG1vbnRoXCIsIGV0Yy5cbiAqL1xuXG5jb25zdCBEaXZpZGVyRGF0ZSA9IHtcbiAgICBUT0RBWTogeyB2YWx1ZTogMSwgdGV4dDogJ1RvZGF5JyB9LFxuICAgIFlFU1RFUkRBWTogeyB2YWx1ZTogMiwgdGV4dDogJ1llc3RlcmRheScgfSxcbiAgICBUSElTX01PTlRIOiB7IHZhbHVlOiAzLCB0ZXh0OiAnVGhpcyBtb250aCcgfSxcbiAgICBMQVNUX01PTlRIOiB7IHZhbHVlOiA0LCB0ZXh0OiAnTGFzdCBtb250aCcgfSxcbiAgICBFQVJMSUVSOiB7IHZhbHVlOiA1LCB0ZXh0OiAnRWFybGllcicgfVxufTtcblxuLyoqXG4gKiBJbnNlcnRzIGRhdGUgZGl2aWRlciBvYmplY3RzIGJldHdlZW4gdGhlIGdpdmVuIHJvd3MsIGFuZCByZXR1cm5zIHRoZSBcbiAqIG1vZGlmaWVkIGxpc3Qgb2Ygcm93cyB3aXRoIGRhdGUgZGl2aWRlciByb3dzLlxuICovXG5mdW5jdGlvbiB3aXRoRGF0ZURpdmlkZXJzKFxuICAgIG1lc3NhZ2VzQW5kQnVuZGxlUm93cywgXG4gICAgc2FtcGxlRGF0ZSwgXG4gICAgZ2V0TGF0ZXN0TWVzc2FnZUZvclJvdyA9IHggPT4geCA/IHguZWxlbWVudCA6IG51bGwsXG4gICAgZ2V0Tm93ID0gKCkgPT4gbmV3IERhdGUoKSkgXG57XG4gICAgY29uc3Qgcm93cyA9IFtdO1xuICAgIFxuICAgIGxldCBkYXRlRGl2aWRlcnMgPSBfZ2V0RGF0ZURpdmlkZXJzKHNhbXBsZURhdGUsIGdldE5vdygpKTtcbiAgICBsZXQgcHJldlJvdyA9IG51bGw7XG4gICAgbGV0IGFkZGVkVG9kYXlGb3JTbm9vemVkTWVzc2FnZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZXNBbmRCdW5kbGVSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJSb3cgPSBtZXNzYWdlc0FuZEJ1bmRsZVJvd3NbaV07XG4gICAgICAgIGlmIChnZXRMYXRlc3RNZXNzYWdlRm9yUm93KGN1cnJSb3cpLnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3JzLk1FU1NBR0VfU05PT1pFRF9URVhUKSkgeyBcbiAgICAgICAgICAgIC8vIFVzZSBcIlRvZGF5XCIgaWYgdGhlIGZpcnN0IG1lc3NhZ2UgaXMgc25vb3plZFxuICAgICAgICAgICAgaWYgKGkgPT09IDAgJiYgZGF0ZURpdmlkZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJvd3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGRhdGVEaXZpZGVyc1swXSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogRWxlbWVudC5EQVRFX0RJVklERVIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYWRkZWRUb2RheUZvclNub296ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcm93cy5wdXNoKGN1cnJSb3cpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCBwdXNoIGRpdmlkZXJzIGluIGZyb250IG9mIHNub296ZWQgcm93czsgdGhleSdsbCBiZWxvbmcgdG9cbiAgICAgICAgICAgIC8vIHRoZSBzYW1lIHNlY3Rpb24gYXMgdGhlIHByZXZpb3VzIHJvd1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaXZpZGVyID0gX3Nob3VsZEluc2VydERhdGVEaXZpZGVyKFxuICAgICAgICAgICAgZ2V0TGF0ZXN0TWVzc2FnZUZvclJvdyhwcmV2Um93KSwgZ2V0TGF0ZXN0TWVzc2FnZUZvclJvdyhjdXJyUm93KSwgZGF0ZURpdmlkZXJzKTtcbiAgICAgICAgaWYgKGRpdmlkZXIgJiYgXG4gICAgICAgICAgICAvLyBJZiBcIlRvZGF5XCIgd2FzIGFscmVhZHkgYWRkZWQgZm9yIGEgc25vb3plZCBtZXNzYWdlLCB0aGVuIGRvbid0IGFkZCBpdCBhZ2FpblxuICAgICAgICAgICAgIShhZGRlZFRvZGF5Rm9yU25vb3plZE1lc3NhZ2UgJiYgZGl2aWRlci52YWx1ZSA9PT0gRGl2aWRlckRhdGUuVE9EQVkudmFsdWUpKSBcbiAgICAgICAge1xuICAgICAgICAgICAgcm93cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIHR5cGU6IEVsZW1lbnQuREFURV9ESVZJREVSLFxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcm93cy5wdXNoKGN1cnJSb3cpO1xuICAgICAgICBwcmV2Um93ID0gY3VyclJvdztcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbn1cblxuLyoqXG4gKiBGaW5kIG1lc3NhZ2VzIHRoYXQgYXJlIGJldHdlZW4gdGhlIGdpdmVuIGRpdmlkZXJJbmRleCBhbmQgdGhlIG5leHQgZGF0ZSBkaXZpZGVyLlxuICovXG5mdW5jdGlvbiBmaW5kTWVzc2FnZXNGb3JEaXZpZGVyKHRhYmxlUm93cywgZGl2aWRlckluZGV4KSB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gZGl2aWRlckluZGV4ICsgMTsgaSA8IHRhYmxlUm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByb3cgPSB0YWJsZVJvd3NbaV07XG4gICAgICAgIGlmIChyb3cudHlwZSA9PT0gRWxlbWVudC5EQVRFX0RJVklERVIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvdy50eXBlID09PSBFbGVtZW50LlVOQlVORExFRF9NRVNTQUdFKSB7XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHJvdy5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3cudHlwZSA9PT0gRWxlbWVudC5CVU5ETEUpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goLi4ucm93LmVsZW1lbnQuZ2V0TWVzc2FnZXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZXM7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGF0ZSBkaXZpZGVyIHJvdy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlKGRpdmlkZXIsIG9yZGVyLCBtZXNzYWdlcykge1xuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLXJvd1wiPlxuICAgICAgICAgICAgJHtkaXZpZGVyLnRleHR9XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgY29uc3QgZWwgPSBEb21VdGlscy5odG1sVG9FbGVtZW50KGh0bWwpO1xuICAgIGVsLnN0eWxlLm9yZGVyID0gb3JkZXI7XG5cbiAgICBlbC5hcHBlbmRDaGlsZChCdWxrQXJjaGl2ZUJ1dHRvbi5jcmVhdGUobWVzc2FnZXMpKTtcblxuICAgIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGRhdGUgZGl2aWRlcnMsIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBjdXJyZW50IGRhdGUuIFxuICogXG4gKiBEYXRlIGRpdmlkZXJzIGFyZSBvYmplY3RzIHdpdGggdGhlIGZpZWxkcyAndmFsdWUnIChlbnVtIHZhbHVlKSwgJ3RleHQnIChkaXNwbGF5ZWQgdG8gdXNlciksIGFuZCBcbiAqICdlbmREYXRlJyAoZGF0ZSBkZWZpbmluZyB0aGUgZW5kIG9mIHRoZSB0aW1lIHJhbmdlKTtcbiAqXG4gKiBJZiBkYXRlIGRpdmlkZXJzIGFyZW4ndCBzdXBwb3J0ZWQgZm9yIGRhdGVzIGluIGEgZm9ybWF0IG9mIHRoZSBzYW1wbGVEYXRlU3RyaW5nLCByZXR1cm5zIFxuICogYW4gZW1wdHkgbGlzdC5cbiAqL1xuZnVuY3Rpb24gX2dldERhdGVEaXZpZGVycyhzYW1wbGVEYXRlU3RyaW5nLCBub3cpIHtcbiAgICBpZiAoIV9pc0RhdGVEaXZpZGVyU3VwcG9ydGVkKHNhbXBsZURhdGVTdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkpO1xuICAgIHRvZGF5LnNldEhvdXJzKDApO1xuICAgIHRvZGF5LnNldE1pbnV0ZXMoMCk7XG4gICAgdG9kYXkuc2V0U2Vjb25kcygwKTtcbiAgICB0b2RheS5zZXRNaWxsaXNlY29uZHMoMCk7XG5cbiAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcblxuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5LmdldERhdGUoKSAtIDEpO1xuXG4gICAgY29uc3QgbW9udGhTdGFydCA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSk7XG4gICAgbW9udGhTdGFydC5zZXREYXRlKDEpO1xuXG4gICAgY29uc3QgbGFzdE1vbnRoU3RhcnQgPSBuZXcgRGF0ZShtb250aFN0YXJ0LmdldFRpbWUoKSk7XG4gICAgbGFzdE1vbnRoU3RhcnQuc2V0TW9udGgobGFzdE1vbnRoU3RhcnQuZ2V0TW9udGgoKSAtIDEpO1xuXG4gICAgY29uc3QgdXNlVGhpc01vbnRoID0geWVzdGVyZGF5LmdldFRpbWUoKSA+IG1vbnRoU3RhcnQuZ2V0VGltZSgpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgeyBcbiAgICAgICAgICAgIC4uLkRpdmlkZXJEYXRlLlRPREFZLFxuICAgICAgICAgICAgZW5kRGF0ZTogdG9tb3Jyb3dcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgLi4uRGl2aWRlckRhdGUuWUVTVEVSREFZLFxuICAgICAgICAgICAgZW5kRGF0ZTogdG9kYXlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgLi4uKHVzZVRoaXNNb250aCA/IERpdmlkZXJEYXRlLlRISVNfTU9OVEggOiBEaXZpZGVyRGF0ZS5MQVNUX01PTlRIKSxcbiAgICAgICAgICAgIGVuZERhdGU6IHllc3RlcmRheVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAuLi5EaXZpZGVyRGF0ZS5FQVJMSUVSLFxuICAgICAgICAgICAgZW5kRGF0ZTogdXNlVGhpc01vbnRoID8gbW9udGhTdGFydCA6IGxhc3RNb250aFN0YXJ0XG4gICAgICAgIH1cbiAgICBdO1xufVxuXG5mdW5jdGlvbiBfaXNEYXRlRGl2aWRlclN1cHBvcnRlZChzYW1wbGVEYXRlU3RyaW5nKSB7XG4gICAgaWYgKCFzYW1wbGVEYXRlU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISFfcGFyc2VEYXRlKHNhbXBsZURhdGVTdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VEYXRlKGRhdGVTdHJpbmcpIHtcbiAgICBjb25zdCBkYXRlID0gRGF0ZS5wYXJzZShkYXRlU3RyaW5nKTtcbiAgICBpZiAoaXNOYU4oZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRhdGUgZGl2aWRlciBvYmplY3QgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBkaXZpZGUgcHJldiBhbmQgY3VyciBtZXNzYWdlIG5vZGUsXG4gKiBpZiBhbnksIG9yIG51bGwgb3RoZXJ3aXNlLiBcbiAqL1xuZnVuY3Rpb24gX3Nob3VsZEluc2VydERhdGVEaXZpZGVyKHByZXZNZXNzYWdlTm9kZSwgY3Vyck1lc3NhZ2VOb2RlLCBkYXRlRGl2aWRlcnMpIHtcbiAgICBmb3IgKGxldCBpID0gZGF0ZURpdmlkZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGRpdmlkZXJEYXRlID0gZGF0ZURpdmlkZXJzW2ldLmVuZERhdGU7XG4gICAgICAgIGNvbnN0IHByZXZEYXRlID0gcHJldk1lc3NhZ2VOb2RlIFxuICAgICAgICAgICAgPyBfZXh0cmFjdE1lc3NhZ2VEYXRlKHByZXZNZXNzYWdlTm9kZSkgXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGNvbnN0IGN1cnJEYXRlID0gX2V4dHJhY3RNZXNzYWdlRGF0ZShjdXJyTWVzc2FnZU5vZGUpO1xuXG4gICAgICAgIGlmICgocHJldkRhdGUgPT0gbnVsbCB8fCBwcmV2RGF0ZSA+PSBkaXZpZGVyRGF0ZSkgJiYgZGl2aWRlckRhdGUgPiBjdXJyRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVEaXZpZGVyc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBfZXh0cmFjdE1lc3NhZ2VEYXRlKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gX3BhcnNlRGF0ZShEb21VdGlscy5leHRyYWN0RGF0ZShtZXNzYWdlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGUsXG4gICAgd2l0aERhdGVEaXZpZGVycyxcbiAgICBmaW5kTWVzc2FnZXNGb3JEaXZpZGVyLFxuICAgIC8vIEV4cG9zZWQgZm9yIHRlc3RpbmdcbiAgICBfZ2V0RGF0ZURpdmlkZXJzLFxufTtcbiIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBcbiAgICBVcmxzLFxuICAgIEluYm94eUNsYXNzZXMsXG59IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcbmltcG9ydCBEb21VdGlscyBmcm9tICcuLi91dGlsL0RvbVV0aWxzJztcbmltcG9ydCB7XG4gICAgc3VwcG9ydHNCdW5kbGluZyxcbiAgICBpc1N0YXJyZWRQYWdlLFxuICAgIGdldEN1cnJlbnRCYXNlVXJsLFxufSBmcm9tICcuLi91dGlsL01lc3NhZ2VQYWdlVXRpbHMnO1xuXG4vKipcbiAqIFRvZ2dsZSBiZXR3ZWVuIHRoZSBpbmJveCBhbmQgcGlubmVkIG1lc3NhZ2VzLlxuICovXG5jbGFzcyBQaW5uZWRUb2dnbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNob3dQaW5uZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gZ2V0Q3VycmVudEJhc2VVcmwoKTtcblxuICAgICAgICB0aGlzLl9vbkhhc2hDaGFuZ2UgPSB0aGlzLl9vbkhhc2hDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlID0gdGhpcy5fdG9nZ2xlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLl9vbkhhc2hDaGFuZ2UpO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBSZXR1cm5zIGEgdG9nZ2xlIGRvbSBlbGVtZW50IHRoYXQgY2hhbmdlcyBzdGF0ZSBvbiBoYXNoY2hhbmdlIGFuZCBjbGljayBldmVudHMuXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gRG9tVXRpbHMuaHRtbFRvRWxlbWVudChgXG4gICAgICAgICAgICA8YSBocmVmPVwiXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNsaWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyLWJ1dHRvblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICBgKTtcbiAgICAgICAgLy8gVG9nZ2xlIGltbWVkaWF0ZWx5IG9uIGNsaWNrXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBuZXcgc3RhdGUgb2YgdGhlIHRvZ2dsZSBzaG91bGQgYmUgY29ycmVjdCwgYnV0IGluIGNhc2UgaXQgaXNuJ3QsIHRoZSBzdGF0ZVxuICAgICAgICAvLyBhbHNvIGdldHMgc2V0IGJhc2VkIG9uIHRoZSB1cmwgdXBvbiBoYXNoY2hhbmdlXG4gICAgICAgIGFuY2hvckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90b2dnbGUpO1xuXG4gICAgICAgIGNvbnN0IHRvZ2dsZUVsZW1lbnQgPSBEb21VdGlscy5odG1sVG9FbGVtZW50KGA8ZGl2IGNsYXNzPVwicGlubmVkLXRvZ2dsZVwiPjwvZGl2PmApO1xuICAgICAgICB0b2dnbGVFbGVtZW50LmFwcGVuZENoaWxkKGFuY2hvckVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCA9IHRvZ2dsZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yRWxlbWVudCA9IGFuY2hvckVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlVG9nZ2xlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgc3RhdGUgdmlzdWFsbHkuIFxuICAgICAqL1xuICAgIF90b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXBpbm5lZCcpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1waW5uZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93LXBpbm5lZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc3RhdGUgYmFzZWQgb24gdGhlIGN1cnJlbnQgdXJsLlxuICAgICAqL1xuICAgIF9vbkhhc2hDaGFuZ2UoZSkge1xuICAgICAgICB0aGlzLl91cGRhdGVUb2dnbGUoZS5uZXdVUkwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgbGluayBhbmQgc3R5bGluZyBvZiB0aGUgdG9nZ2xlIGJhc2VkIG9uIHRoZSBjdXJyZW50IHVybCxcbiAgICAgKiBvciBoaWRlIHRoZSB0b2dnbGUgaWYgaXQgc2hvdWxkbid0IGJlIHNob3duLlxuICAgICAqL1xuICAgIF91cGRhdGVUb2dnbGUodXJsKSB7XG4gICAgICAgIGlmIChpc1N0YXJyZWRQYWdlKHVybCkpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudC5zdHlsZSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5hbmNob3JFbGVtZW50LmhyZWYgPSBgJHt0aGlzLmJhc2VVcmx9I2luYm94YDtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93LXBpbm5lZCcpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmNsYXNzTGlzdC5hZGQoSW5ib3h5Q2xhc3Nlcy5TSE9XX1BJTk5FRF9UT0dHTEUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1cHBvcnRzQnVuZGxpbmcodXJsKSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50LnN0eWxlID0ge307XG4gICAgICAgICAgICB0aGlzLmFuY2hvckVsZW1lbnQuaHJlZiA9IGAke3RoaXMuYmFzZVVybH0jJHtVcmxzLlNUQVJSRURfUEFHRV9IQVNIfWA7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1waW5uZWQnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5jbGFzc0xpc3QuYWRkKEluYm94eUNsYXNzZXMuU0hPV19QSU5ORURfVE9HR0xFKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuY2xhc3NMaXN0LnJlbW92ZShJbmJveHlDbGFzc2VzLlNIT1dfUElOTkVEX1RPR0dMRSk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cbn0gXG5cbmV4cG9ydCBkZWZhdWx0IFBpbm5lZFRvZ2dsZTsiLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuLyoqXG4gKiBBIGJ1bmRsZSBvZiBtZXNzYWdlcyB0aGF0IGJlbG9uZyB0byBhIHBhcnRpY3VsYXIgbGFiZWwuXG4gKi9cbmNsYXNzIEJ1bmRsZSB7XG4gICAgY29uc3RydWN0b3IobGFiZWwsIHN0eWxlKSB7XG4gICAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgIHRoaXMuX2J1bmRsZVJvdyA9IG51bGw7XG4gICAgICAgIHRoaXMuX29yZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWVzc2FnZXMgPSBbXTtcbiAgICB9XG5cbiAgICBzZXRCdW5kbGVSb3coYnVuZGxlUm93KSB7XG4gICAgICAgIHRoaXMuX2J1bmRsZVJvdyA9IGJ1bmRsZVJvdztcbiAgICB9XG5cbiAgICBzZXRPcmRlcihvcmRlcikge1xuICAgICAgICB0aGlzLl9vcmRlciA9IG9yZGVyO1xuICAgIH1cblxuICAgIGFkZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBsYWJlbCB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGJ1bmRsZS5cbiAgICAgKi9cbiAgICBnZXRMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBUaGUgc3R5bGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgYnVuZGxlLlxuICAgICAqL1xuICAgIGdldFN0eWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRvbSBlbGVtZW50IGZvciB0aGUgdGFibGUgcm93IHJlcHJlc2VudGluZyB0aGUgYnVuZGxlLlxuICAgICAqL1xuICAgIGdldEJ1bmRsZVJvdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1bmRsZVJvdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXIgcHJvcGVydHkgZm9yIHRoZSBidW5kbGUgcm93LlxuICAgICAqL1xuICAgIGdldE9yZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBsaXN0IG9mIG1lc3NhZ2UgZG9tIGVsZW1lbnRzLCBmb3IgbWVzc2FnZXMgaW4gdGhlIGJ1bmRsZS5cbiAgICAgKi9cbiAgICBnZXRNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVuZGxlO1xuIiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IFxuICAgIGdldEN1cnJlbnRQYWdlTnVtYmVyLFxuICAgIGdldEN1cnJlbnRUYWIsXG59IGZyb20gJy4uL3V0aWwvTWVzc2FnZVBhZ2VVdGlscyc7XG5cbi8qKlxuICogVGhlIGNvbGxlY3Rpb24gb2YgYnVuZGxlZCBtYWlsIGZvciB0aGUgaW5ib3guXG4gKiBcbiAqIEtlZXBzIHRyYWNrIG9mIGJ1bmRsZXMgZm9yIGVhY2ggcGFnZS90YWIgb2YgbWVzc2FnZXMsIGFuZCB0aGUgY3VycmVudCBvcGVuIGJ1bmRsZS5cbiAqL1xuY2xhc3MgQnVuZGxlZE1haWwge1xuICAgIGNvbnN0cnVjdG9yKCkgeyBcbiAgICAgICAgLy8gQnVuZGxlcyBtYXAsIGtleWVkIGJ5IHBhZ2VOdW1iZXIsIHRhYiBuYW1lLCBhbmQgbGFiZWxcbiAgICAgICAgdGhpcy5fYnVuZGxlc01hcCA9IHt9O1xuICAgICAgICB0aGlzLl9vcGVuZWRCdW5kbGVMYWJlbCA9ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYnVuZGxlIGZvciB0aGUgY3VycmVudCBwYWdlIG9mIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGdldEJ1bmRsZShsYWJlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdW5kbGVPblBhZ2UobGFiZWwsIGdldEN1cnJlbnRQYWdlTnVtYmVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYnVuZGxlIGZvciB0aGUgZ2l2ZW4gcGFnZSBudW1iZXIgYW5kIGxhYmVsLlxuICAgICAqL1xuICAgIGdldEJ1bmRsZU9uUGFnZShsYWJlbCwgcGFnZU51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVuZGxlc01hcFtwYWdlTnVtYmVyXVtnZXRDdXJyZW50VGFiKCldW2xhYmVsXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWFwIG9mIGFsbCBidW5kbGVzIG9uIHRoZSBjdXJyZW50IHBhZ2UsIGJ5IGxhYmVsLlxuICAgICAqL1xuICAgIGdldEFsbEJ1bmRsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idW5kbGVzTWFwW2dldEN1cnJlbnRQYWdlTnVtYmVyKCldW2dldEN1cnJlbnRUYWIoKV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFiZWwgY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudGx5IG9wZW4gYnVuZGxlLlxuICAgICAqL1xuICAgIGdldExhYmVsT2ZPcGVuZWRCdW5kbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWRCdW5kbGVMYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWNvcmQgdGhhdCB0aGUgYnVuZGxlIHdpdGggdGhlIGdpdmVuIGxhYmVsLCBpcyBjdXJyZW50bHkgb3Blbi5cbiAgICAgKi9cbiAgICBvcGVuQnVuZGxlKGxhYmVsKSB7XG4gICAgICAgIHRoaXMuX29wZW5lZEJ1bmRsZUxhYmVsID0gbGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjb3JkIHRoYXQgbm8gYnVuZGxlcyBhcmUgb3Blbi5cbiAgICAgKi9cbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgICAgdGhpcy5fb3BlbmVkQnVuZGxlTGFiZWwgPSAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NvY2lhdGUgYnVuZGxlc0J5TGFiZWwgd2l0aCB0aGUgZ2l2ZW4gbWVzc2FnZSBwYWdlIG51bWJlci5cbiAgICAgKi9cbiAgICBzZXRCdW5kbGVzKGJ1bmRsZXNCeUxhYmVsLCBwYWdlTnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYnVuZGxlc01hcFtwYWdlTnVtYmVyXSkge1xuICAgICAgICAgICAgdGhpcy5fYnVuZGxlc01hcFtwYWdlTnVtYmVyXSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnVuZGxlc01hcFtwYWdlTnVtYmVyXVtnZXRDdXJyZW50VGFiKCldID0gYnVuZGxlc0J5TGFiZWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdW5kbGVkTWFpbDsiLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuLyoqXG4gKiBBIGNvbG9yLlxuICovXG5jbGFzcyBSR0JDb2xvciB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT0gMVxuICAgICAgICAgICAgJiYgKHR5cGVvZihhcmdzWzBdKSA9PT0gJ3N0cmluZycgfHwgYXJnc1swXSBpbnN0YW5jZW9mIFN0cmluZykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zyb21TdHJpbmcoYXJnc1swXSlcbiAgICAgICAgfSBlbHNlIGlmICgzIDw9IGFyZ3MubGVuZ3RoICYmIGFyZ3MubGVuZ3RoIDw9IDQpIHtcbiAgICAgICAgICAgIHRoaXMuX3IgPSBhcmdzWzBdO1xuICAgICAgICAgICAgdGhpcy5fZyA9IGFyZ3NbMV07XG4gICAgICAgICAgICB0aGlzLl9iID0gYXJnc1syXTtcbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hID0gYXJnc1szXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9mcm9tU3RyaW5nKHN0cikge1xuICAgICAgICAvL1RPRE8vLyBwYXJzZSBzdHIgd2l0aCBhIHJlZ2V4cCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHJnYmFUb1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYHJnYmEoJHt0aGlzLl9yfSwke3RoaXMuX2d9LCR7dGhpcy5fYn0sJHt0aGlzLl9hfSlgOyB9O1xuICAgICAgICBjb25zdCByZ2IgID0gKHIsZyxiKSAgID0+IHsgcmV0dXJuIHtfcjpyLCBfZzpnLCBfYjpiLCBfYToxLCB0b1N0cmluZzogcmdiYVRvU3RyaW5nfTsgfSxcbiAgICAgICAgICAgICAgcmdiYSA9IChyLGcsYixhKSA9PiB7IHJldHVybiB7X3I6ciwgX2c6ZywgX2I6YiwgX2E6YSwgdG9TdHJpbmc6IHJnYmFUb1N0cmluZ307IH07XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZXZhbChzdHIpKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2EgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGByZ2JhKCR7dGhpcy5fcn0sJHt0aGlzLl9nfSwke3RoaXMuX2J9LCR7dGhpcy5fYX0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgcmdiKCR7dGhpcy5fcn0sJHt0aGlzLl9nfSwke3RoaXMuX2J9KWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJHQkNvbG9yO1xuIiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCBCdW5kbGVUb2dnbGVyIGZyb20gJy4vYnVuZGxpbmcvQnVuZGxlVG9nZ2xlcic7XG5pbXBvcnQgQnVuZGxlciBmcm9tICcuL2J1bmRsaW5nL0J1bmRsZXInO1xuaW1wb3J0IERhdGVHcm91cGVyIGZyb20gJy4vYnVuZGxpbmcvRGF0ZUdyb3VwZXInO1xuaW1wb3J0IFNlbGVjdGl2ZUJ1bmRsaW5nIGZyb20gJy4vYnVuZGxpbmcvU2VsZWN0aXZlQnVuZGxpbmcnO1xuXG5pbXBvcnQgQnVuZGxlZE1haWwgZnJvbSAnLi9jb250YWluZXJzL0J1bmRsZWRNYWlsJztcblxuaW1wb3J0IFBpbm5lZFRvZ2dsZSBmcm9tICcuL2NvbXBvbmVudHMvUGlubmVkVG9nZ2xlJztcblxuaW1wb3J0IFRhYlBhbmVsc09ic2VydmVyIGZyb20gJy4vaGFuZGxlcnMvVGFiUGFuZWxzT2JzZXJ2ZXInO1xuaW1wb3J0IE1haW5QYXJlbnRPYnNlcnZlciBmcm9tICcuL2hhbmRsZXJzL01haW5QYXJlbnRPYnNlcnZlcic7XG5pbXBvcnQgTWVzc2FnZUxpc3RXYXRjaGVyIGZyb20gJy4vaGFuZGxlcnMvTWVzc2FnZUxpc3RXYXRjaGVyJztcbmltcG9ydCBTdGFySGFuZGxlciBmcm9tICcuL2hhbmRsZXJzL1N0YXJIYW5kbGVyJztcbmltcG9ydCBUaGVtZUNoYW5nZUhhbmRsZXIgZnJvbSAnLi9oYW5kbGVycy9UaGVtZUNoYW5nZUhhbmRsZXInO1xuXG5pbXBvcnQge2NyZWF0ZUNvbXBvc2VCdXR0b259IGZyb20gJy4vY29tcG9uZW50cy9Db21wb3NlQnV0dG9uJztcblxuaW1wb3J0IHsgXG4gICAgSW5ib3h5Q2xhc3NlcyxcbiAgICBTZWxlY3RvcnMsXG59IGZyb20gJy4vdXRpbC9Db25zdGFudHMnO1xuaW1wb3J0IHsgXG4gICAgc3VwcG9ydHNCdW5kbGluZyxcbiAgICBpc1N0YXJyZWRQYWdlLFxufSBmcm9tICcuL3V0aWwvTWVzc2FnZVBhZ2VVdGlscyc7XG5cbmNvbnN0IGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG5pZiAoaHRtbCkge1xuICAgIGh0bWwuY2xhc3NMaXN0LmFkZChJbmJveHlDbGFzc2VzLklOQk9YWSk7XG59XG5cbmNvbnN0IFJFVFJZX1RJTUVPVVRfTVMgPSA1MDtcblxubGV0IGlzRnJlc2hQYWdlID0gZmFsc2U7XG5jb25zdCBoYW5kbGVGcmVzaFBhZ2UgPSBlID0+IGlzRnJlc2hQYWdlID0gdHJ1ZTtcblxubGV0IGludGVyYWN0ZWRXaXRoQnVuZGxlID0gZmFsc2U7XG5jb25zdCBoYW5kbGVCdW5kbGVJbnRlcmFjdGlvbiA9IGUgPT4gaW50ZXJhY3RlZFdpdGhCdW5kbGUgPSB0cnVlO1xuIFxuY29uc3QgbWVzc2FnZUxpc3RXYXRjaGVyID0gbmV3IE1lc3NhZ2VMaXN0V2F0Y2hlcihtdXRhdGlvbnMgPT4ge1xuICAgIGlmIChzdXBwb3J0c0J1bmRsaW5nKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSkge1xuICAgICAgICBjb25zdCByZW9wZW5SZWNlbnRCdW5kbGUgPSAhaXNGcmVzaFBhZ2U7XG4gICAgICAgIGJ1bmRsZXIuYnVuZGxlTWVzc2FnZXMocmVvcGVuUmVjZW50QnVuZGxlKTtcbiAgICAgICAgc3RhckhhbmRsZXIuc2Nyb2xsSWZOZWNlc3NhcnkoKTtcbiAgICAgICAgXG4gICAgICAgIGlzRnJlc2hQYWdlID0gZmFsc2U7XG4gICAgfVxufSk7XG5cbmNvbnN0IGJ1bmRsZWRNYWlsID0gbmV3IEJ1bmRsZWRNYWlsKCk7XG5jb25zdCBidW5kbGVUb2dnbGVyID0gbmV3IEJ1bmRsZVRvZ2dsZXIoYnVuZGxlZE1haWwpO1xuY29uc3Qgc2VsZWN0aXZlQnVuZGxpbmcgPSBuZXcgU2VsZWN0aXZlQnVuZGxpbmcoKTtcbmNvbnN0IGJ1bmRsZXIgPSBuZXcgQnVuZGxlcihidW5kbGVUb2dnbGVyLCBidW5kbGVkTWFpbCwgbWVzc2FnZUxpc3RXYXRjaGVyLCBzZWxlY3RpdmVCdW5kbGluZyk7XG5jb25zdCBzdGFySGFuZGxlciA9IG5ldyBTdGFySGFuZGxlcihidW5kbGVkTWFpbCwgc2VsZWN0aXZlQnVuZGxpbmcpO1xuY29uc3QgZGF0ZUdyb3VwZXIgPSBuZXcgRGF0ZUdyb3VwZXIoKTtcblxuLy8gXG4vLyBPYnNlcnZlcnMgZm9yIGhhbmRsaW5nIG5hdmlnYXRpb25cbi8vIFxuY29uc3QgcmVidW5kbGUgPSAoKSA9PiB7XG4gICAgaWYgKCFpbnRlcmFjdGVkV2l0aEJ1bmRsZSB8fCBpc0ZyZXNoUGFnZSkge1xuICAgICAgICBidW5kbGVUb2dnbGVyLmNsb3NlQWxsQnVuZGxlcygpO1xuICAgIH1cbiAgICBidW5kbGVyLmJ1bmRsZU1lc3NhZ2VzKHRydWUpO1xuXG4gICAgaXNGcmVzaFBhZ2UgPSBmYWxzZTtcbiAgICBpbnRlcmFjdGVkV2l0aEJ1bmRsZSA9IGZhbHNlO1xufTtcbmNvbnN0IHRhYlBhbmVsc09ic2VydmVyID0gbmV3IFRhYlBhbmVsc09ic2VydmVyKG11dGF0aW9ucyA9PiByZWJ1bmRsZSgpKTtcbmNvbnN0IG1haW5QYXJlbnRPYnNlcnZlciA9IG5ldyBNYWluUGFyZW50T2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICBpZiAoc3VwcG9ydHNCdW5kbGluZyh3aW5kb3cubG9jYXRpb24uaHJlZikpIHtcbiAgICAgICAgcmVidW5kbGUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdGFycmVkUGFnZSh3aW5kb3cubG9jYXRpb24uaHJlZikpIHtcbiAgICAgICAgZGF0ZUdyb3VwZXIucmVmcmVzaERhdGVEaXZpZGVycygpO1xuICAgIH1cbn0pO1xuXG4vL1xuLy8gQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuLy9cbi8vIENhbGwgdGhlIGJ1bmRsZXIgd2hlbiB0aGUgcGFnZSBoYXMgbG9hZGVkLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBoYW5kbGVDb250ZW50TG9hZGVkKTtcbn1cbmVsc2Uge1xuICAgIGhhbmRsZUNvbnRlbnRMb2FkZWQoKTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RhckhhbmRsZXIuaGFuZGxlU3RhcnJpbmcpO1xuXG4vLyBSZWNvcmQgd2hlbiBpbnRlcmFjdGlvbnMgd2l0aCBuYXZpZ2F0aW9uLCByZWZyZXNoZXMsIG9yIGJ1bmRsZXMgb2NjdXJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgIGlmIChlLnRhcmdldC5tYXRjaGVzKFNlbGVjdG9ycy5JTkJPWF9UQUIpIHx8IFxuICAgICAgICBlLnRhcmdldC5tYXRjaGVzKGAke1NlbGVjdG9ycy5JTkJPWF9UQUJ9ICpgKSB8fFxuICAgICAgICBlLnRhcmdldC5tYXRjaGVzKFNlbGVjdG9ycy5QQUdFQ0hBTkdJTkdfQlVUVE9OUykgfHxcbiAgICAgICAgZS50YXJnZXQubWF0Y2hlcyhgJHtTZWxlY3RvcnMuUkVGUkVTSH0gKmApKSBcbiAgICB7XG4gICAgICAgIGhhbmRsZUZyZXNoUGFnZShlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS50YXJnZXQubWF0Y2hlcyhgLiR7SW5ib3h5Q2xhc3Nlcy5WSUVXX0FMTF9MSU5LfWApIHx8XG4gICAgICAgIGUudGFyZ2V0Lm1hdGNoZXMoYC4ke0luYm94eUNsYXNzZXMuVklFV19BTExfTElOS30gKmApIHx8IFxuICAgICAgICBlLnRhcmdldC5tYXRjaGVzKGAuJHtJbmJveHlDbGFzc2VzLkJVTkRMRURfTUVTU0FHRX1gKSB8fFxuICAgICAgICBlLnRhcmdldC5tYXRjaGVzKGAuJHtJbmJveHlDbGFzc2VzLkJVTkRMRURfTUVTU0FHRX0gKmApKSBcbiAgICB7XG4gICAgICAgIGhhbmRsZUJ1bmRsZUludGVyYWN0aW9uKGUpO1xuICAgIH1cbn0pO1xuXG5cbi8vXG4vLyBJbml0aWFsIGJ1bmRsaW5nXG4vL1xuXG5mdW5jdGlvbiBoYW5kbGVDb250ZW50TG9hZGVkKCkge1xuICAgIGNvbnN0IGJ1bmRsZUN1cnJlbnRQYWdlID0gc3VwcG9ydHNCdW5kbGluZyh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdHJ5QnVuZGxpbmcoMCwgYnVuZGxlQ3VycmVudFBhZ2UpO1xuICAgIGNyZWF0ZUNvbXBvc2VCdXR0b24oKTtcbn1cblxuZnVuY3Rpb24gdHJ5QnVuZGxpbmcoaSwgYnVuZGxlQ3VycmVudFBhZ2UpIHtcbiAgICBpZiAoaSA+IDYwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW5ib3h5IHdhcyB1bmFibGUgdG8gYnVuZGxlIG1lc3NhZ2VzLiBUbyB0cnkgYWdhaW4sIHJlZnJlc2ggdGhlIHBhZ2UuJylcbiAgICB9XG5cbiAgICBpZiAoIWJ1bmRsZUN1cnJlbnRQYWdlKSB7XG4gICAgICAgIC8vIEF0dGFjaCBvYnNlcnZlcnMgc28gdGhhdCBidW5kbGluZyB3aWxsIG9jY3VyIGxhdGVyIHdoZW4gaXQgbmVlZHMgdG9cbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3JzLk1BSU4pO1xuICAgICAgICBpZiAoIW1haW4pIHtcbiAgICAgICAgICAgIC8vIFRyeSBhZ2FpbiBsYXRlclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0cnlCdW5kbGluZyhpICsgMSwgYnVuZGxlQ3VycmVudFBhZ2UpLCBSRVRSWV9USU1FT1VUX01TKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkZFBpbm5lZFRvZ2dsZSgpOyBcbiAgICAgICAgICAgIHN0YXJ0T2JzZXJ2ZXJzKCk7XG5cbiAgICAgICAgICAgIGlmIChpc1N0YXJyZWRQYWdlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSkge1xuICAgICAgICAgICAgICAgIGRhdGVHcm91cGVyLnJlZnJlc2hEYXRlRGl2aWRlcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gQnVuZGxlIG1lc3NhZ2VzIG9uIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgICAgY29uc3QgcG9zc2libGVNZXNzYWdlTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9ycy5QT1NTSUJMRV9NRVNTQUdFX0xJU1RTKTs7XG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IHBvc3NpYmxlTWVzc2FnZUxpc3RzLmxlbmd0aCBcbiAgICAgICAgICAgID8gcG9zc2libGVNZXNzYWdlTGlzdHMuaXRlbSgxKS5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5UQUJMRV9CT0RZKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAoIXRhYmxlQm9keSkge1xuICAgICAgICAgICAgLy8gVHJ5IGFnYWluIGxhdGVyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyeUJ1bmRsaW5nKGkgKyAxLCBidW5kbGVDdXJyZW50UGFnZSksIFJFVFJZX1RJTUVPVVRfTVMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnVuZGxlci5idW5kbGVNZXNzYWdlcyhmYWxzZSk7XG4gICAgICAgICAgICBhZGRQaW5uZWRUb2dnbGUoKTtcbiAgICAgICAgICAgIHN0YXJ0T2JzZXJ2ZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0T2JzZXJ2ZXJzKCkge1xuICAgIGNvbnN0IHRoZW1lQ2hhbmdlSGFuZGxlciA9IG5ldyBUaGVtZUNoYW5nZUhhbmRsZXIoKTtcbiAgICB0aGVtZUNoYW5nZUhhbmRsZXIub2JzZXJ2ZSgpO1xuICAgIG1haW5QYXJlbnRPYnNlcnZlci5vYnNlcnZlKCk7XG4gICAgdGFiUGFuZWxzT2JzZXJ2ZXIub2JzZXJ2ZSgpO1xufVxuXG5mdW5jdGlvbiBhZGRQaW5uZWRUb2dnbGUoKSB7XG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3JzLlNFQVJDSF9GT1JNKS5wYXJlbnROb2RlO1xuICAgIHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoKG5ldyBQaW5uZWRUb2dnbGUoKSkuY3JlYXRlKCkpO1xufVxuIiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IFNlbGVjdG9ycyB9IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcblxuLyoqXG4gKiBPYnNlcnZlIHRoZSBwYXJlbnQgZWxlbWVudCBvZiB0aGUgcm9sZT1cIm1haW5cIiBlbGVtZW50LCBhbmQgcmVjb3JkIHdoZW4gdGhlIGVsZW1lbnQgXG4gKiBkZXNpZ25hdGVkIHdpdGggcm9sZT1cIm1haW5cIiBjaGFuZ2VzLlxuICpcbiAqIFRoaXMgaXMgdXNlZCB0byBoZWxwIHdpdGggcmVidW5kbGluZyB3aGVuIG5hdmlnYXRpbmcgYmV0d2VlbiBkaWZmZXJlbnQgcGFnZXMgdGhhdCBoYXZlXG4gKiBtZXNzYWdlIGxpc3RzLlxuICovXG5jbGFzcyBNYWluUGFyZW50T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubWFpblBhcmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkTXV0YXRpb25zID0gbXV0YXRpb25zLmZpbHRlcihtID0+IG0udGFyZ2V0Lm1hdGNoZXMoU2VsZWN0b3JzLlBBR0UpKTtcblxuICAgICAgICAgICAgaWYgKGZpbHRlcmVkTXV0YXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbHRlcmVkTXV0YXRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZSgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3JzLk1BSU4pO1xuICAgICAgICB0aGlzLm1haW5QYXJlbnQgPSBtYWluLnBhcmVudE5vZGU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLm1haW5QYXJlbnQsIHsgXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLCBcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsIFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydyb2xlJ10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpblBhcmVudE9ic2VydmVyOyIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBTZWxlY3RvcnMgfSBmcm9tICcuLi91dGlsL0NvbnN0YW50cyc7XG5cbmNvbnN0IE9CU0VSVkVSX0NPTkZJRyA9IHsgYXR0cmlidXRlczogZmFsc2UsIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogZmFsc2UgfTtcblxuLyoqXG4gKiBXcmFwcyBhIG11dGF0aW9uIG9ic2VydmVyIGZvciBhbiBhbmNlc3RvciBvZiB0aGUgbWVzc2FnZSBsaXN0IHRhYmxlcy5cbiAqIFxuICogSW4gYWRkaXRpb24gdG8gbWFudWFsbHkgcmVmcmVzaGVzIHRyaWdnZXJlZCBieSB0aGUgdXNlciwgR21haWwgb2NjYXNpb25hbGx5IHJlcGxhY2VzIHRoZSBjaGlsZHJlblxuICogb2YgdGhpcyBkb20gZWxlbWVudCwgcmVzdWx0aW5nIGluIHRoZSBtZXNzYWdlIGxpc3QgZ2V0dGluZyByZWRyYXduIHRvIGl0cyBvcmlnaW5hbCBcbiAqIHVuYnVuZGxlZCBzdGF0ZS5cbiAqL1xuY2xhc3MgTWVzc2FnZUxpc3RXYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIG9ic2VydmUoKSB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlTWVzc2FnZUxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3RvcnMuUE9TU0lCTEVfTUVTU0FHRV9MSVNUUyk7O1xuICAgICAgICBjb25zdCBtZXNzYWdlTGlzdENvbnRhaW5lciA9IHBvc3NpYmxlTWVzc2FnZUxpc3RzLmxlbmd0aCBcbiAgICAgICAgICAgID8gcG9zc2libGVNZXNzYWdlTGlzdHMuaXRlbSgxKSBcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAobWVzc2FnZUxpc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZShtZXNzYWdlTGlzdENvbnRhaW5lciwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUxpc3RXYXRjaGVyOyIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBcbiAgICBHbWFpbENsYXNzZXMsXG4gICAgSW5ib3h5Q2xhc3Nlcyxcbn0gZnJvbSAnLi4vdXRpbC9Db25zdGFudHMnO1xuaW1wb3J0IERvbVV0aWxzIGZyb20gJy4uL3V0aWwvRG9tVXRpbHMnO1xuaW1wb3J0IHsgc3VwcG9ydHNCdW5kbGluZyB9IGZyb20gJy4uL3V0aWwvTWVzc2FnZVBhZ2VVdGlscyc7XG5pbXBvcnQgSW5ib3h5U3R5bGVyIGZyb20gJy4uL2J1bmRsaW5nL0luYm94eVN0eWxlcic7XG5cbmNvbnN0IE1FU1NBR0VfTElTVF9DT05GSUcgPSB7IFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbn07XG5cbi8qKlxuICogT2JzZXJ2ZXJzIHRvIGhhbmRsZSB3aGVuIG1lc3NhZ2VzJyBjaGVja2JveGVzIGFyZSBjbGlja2VkLlxuICpcbiAqIFJlYXBwbGllcyBpbmJveHkgc3R5bGluZyB3aGVuIEdtYWlsIGFwcGxpZXMgaXRzIG9yaWdpbmFsIHN0eWxlcyB3aGVuIGEgbWVzc2FnZSBpcyBzZWxlY3RlZC5cbiAqL1xuY2xhc3MgTWVzc2FnZVNlbGVjdEhhbmRsZXIge1xuXG4gICAgY29uc3RydWN0b3IoYnVuZGxlZE1haWwsIHNlbGVjdGl2ZUJ1bmRsaW5nKSB7XG4gICAgICAgIHRoaXMuYnVuZGxlZE1haWwgPSBidW5kbGVkTWFpbDtcbiAgICAgICAgdGhpcy5zZWxlY3RpdmVCdW5kbGluZyA9IHNlbGVjdGl2ZUJ1bmRsaW5nO1xuICAgICAgICB0aGlzLm1lc3NhZ2VPYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5pbmJveHlTdHlsZXIgPSBuZXcgSW5ib3h5U3R5bGVyKGJ1bmRsZWRNYWlsKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVNZXNzYWdlQ2hhbmdlID0gdGhpcy5faGFuZGxlTWVzc2FnZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IG9ic2VydmluZyB0aGUgZ2l2ZW4gbWVzc2FnZXMuXG4gICAgICovXG4gICAgc3RhcnRXYXRjaGluZyhtZXNzYWdlRWxlbWVudHMpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlT2JzZXJ2ZXJzID0gbWVzc2FnZUVsZW1lbnRzLm1hcChlbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuX2hhbmRsZU1lc3NhZ2VDaGFuZ2UpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwgTUVTU0FHRV9MSVNUX0NPTkZJRyk7XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3Agd2F0Y2hpbmcgYWxsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIHN0b3BXYXRjaGluZygpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlT2JzZXJ2ZXJzLmZvckVhY2gobyA9PiBvLmRpc2Nvbm5lY3QoKSk7XG4gICAgICAgIHRoaXMubWVzc2FnZU9ic2VydmVycyA9IFtdO1xuICAgIH1cblxuICAgIF9oYW5kbGVNZXNzYWdlQ2hhbmdlKG11dGF0aW9ucykge1xuICAgICAgICBpZiAoIXN1cHBvcnRzQnVuZGxpbmcod2luZG93LmxvY2F0aW9uLmhyZWYpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSAhPT0gJ2F0dHJpYnV0ZXMnIHx8IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtdXRhdGlvbi50YXJnZXQ7XG5cbiAgICAgICAgICAgIC8vIFJlLWFkZCBpbmJveHkgc3R5bGluZyB0aGF0IGdldCByZW1vdmVkIHdoZW4gZ21haWwgYXBwbGllcyBjaGVja2VkL3VuY2hlY2tlZCBzdHlsaW5nXG4gICAgICAgICAgICBpZiAobXV0YXRpb24ub2xkVmFsdWUuaW5jbHVkZXMoSW5ib3h5Q2xhc3Nlcy5CVU5ETEVEX01FU1NBR0UpICYmXG4gICAgICAgICAgICAgICAgIW1lc3NhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKEluYm94eUNsYXNzZXMuQlVORExFRF9NRVNTQUdFKSkgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQnVuZGxlZCBtZXNzYWdlXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKEluYm94eUNsYXNzZXMuQlVORExFRF9NRVNTQUdFKTtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24ub2xkVmFsdWUuaW5jbHVkZXMoSW5ib3h5Q2xhc3Nlcy5WSVNJQkxFKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoSW5ib3h5Q2xhc3Nlcy5WSVNJQkxFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLm9sZFZhbHVlLmluY2x1ZGVzKEluYm94eUNsYXNzZXMuTEFTVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKEluYm94eUNsYXNzZXMuTEFTVCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobXV0YXRpb24ub2xkVmFsdWUuaW5jbHVkZXMoR21haWxDbGFzc2VzLlNFTEVDVEVEKSAhPT0gXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuY29udGFpbnMoR21haWxDbGFzc2VzLlNFTEVDVEVEKSkgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmJveHlTdHlsZXIubWFya1NlbGVjdGVkQnVuZGxlc0ZvcihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RpdmVCdW5kbGluZy5maWx0ZXJTdHJpbmdzKERvbVV0aWxzLmdldExhYmVscyhtZXNzYWdlKSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5ib3h5U3R5bGVyLmRpc2FibGVCdWxrQXJjaGl2ZUlmTmVjZXNzYXJ5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyAgICBcbiAgICB9XG5cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZVNlbGVjdEhhbmRsZXI7XG4iLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IHsgU2VsZWN0b3JzIH0gZnJvbSAnLi4vdXRpbC9Db25zdGFudHMnO1xuXG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7IGF0dHJpYnV0ZXM6IGZhbHNlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcblxuLyoqXG4gKiBPYnNlcnZlciBmb3IgdGhlIHBpbm5lZCBtZXNzYWdlIGxpc3QuXG4gKlxuICogV2F0Y2hlcyBmb3IgYWRkZWQvcmVtb3ZlZCByb3dzIGluIHRoZSB0YWJsZSBib2R5LlxuICovXG5jbGFzcyBQaW5uZWRNZXNzYWdlTGlzdFdhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZSgpIHtcbiAgICAgICAgY29uc3QgcG9zc2libGVNZXNzYWdlTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9ycy5QT1NTSUJMRV9NRVNTQUdFX0xJU1RTKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZUxpc3RDb250YWluZXIgPSBwb3NzaWJsZU1lc3NhZ2VMaXN0cy5sZW5ndGggXG4gICAgICAgICAgICA/IHBvc3NpYmxlTWVzc2FnZUxpc3RzLml0ZW0oMSkgXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgaWYgKG1lc3NhZ2VMaXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb25zdCB0Ym9keSA9IG1lc3NhZ2VMaXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG4gICAgICAgICAgICBpZiAodGJvZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGJvZHksIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBpbm5lZE1lc3NhZ2VMaXN0V2F0Y2hlcjsiLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IHtcbiAgICBTZWxlY3RvcnMsXG59IGZyb20gJy4uL3V0aWwvQ29uc3RhbnRzJztcbmltcG9ydCB7IGdldEN1cnJlbnRQYWdlTnVtYmVyIH0gZnJvbSAnLi4vdXRpbC9NZXNzYWdlUGFnZVV0aWxzJztcbmltcG9ydCBEb21VdGlscyBmcm9tICcuLi91dGlsL0RvbVV0aWxzJztcblxuLyoqXG4gKiBFbmFibGUgcXVpY2sgc2VsZWN0aW9uIG9mIG11bHRpcGxlIG1lc3NhZ2VzIHZpYSBzaGlmdCArIGNsaWNrLlxuICpcbiAqIFRvIGRvIHNvLCB0aGlzIGNsYXNzIGFjdHVhbGx5IGxpc3RlbnMgdG8gYWxsIGNsaWNrcyB0byBjaGVja2JveGVzIChldmVuIHdoZW4gc2hpZnQga2V5IGlzIG5vdCBcbiAqIHByZXNzZWQpLCBzaW5jZSBjbGljayBoaXN0b3J5IGlzIG5lZWRlZCB0byBkZXRlcm1pbmUgd2hldGhlciBtZXNzYWdlcyBzaG91bGQgYmUgc2VsZWN0ZWQgb3IgXG4gKiBkZXNlbGVjdGVkLlxuICovXG5jbGFzcyBRdWlja1NlbGVjdEhhbmRsZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubW9zdFJlY2VudENoZWNrYm94Q2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmhhbmRsZUNoZWNrYm94Q2xpY2sgPSB0aGlzLmhhbmRsZUNoZWNrYm94Q2xpY2suYmluZCh0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHRoaXMubW9zdFJlY2VudENoZWNrYm94Q2xpY2sgPSBudWxsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciB3aGVuIGEgY2hlY2tib3ggaXMgY2xpY2tlZC5cbiAgICAgKlxuICAgICAqIEFzc3VtZXMgdGhhdCB0aGlzIGhhbmRsZXIgd2lsbCBiZSBhcHBsaWVkIHRvIGNoZWNrYm94IGRvbSBlbGVtZW50cyBvZiB0aGUgc2FtZSBraW5kLCB3aXRoIFxuICAgICAqIHVuaXF1ZSBpZHMuXG4gICAgICovXG4gICAgaGFuZGxlQ2hlY2tib3hDbGljayhlKSB7XG4gICAgICAgIC8vIE9ubHkgaGFuZGxlIHJlYWwgY2xpY2tzXG4gICAgICAgIGlmICghKGUuY2xpZW50WCAmJiBlLmNsaWVudFkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmV2ZW50IGdtYWlsJ3Mgc2hpZnQgKyBjbGljayBoYW5kbGVyIGZyb20gb3BlcmF0aW5nXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgdGhpcy5tb3N0UmVjZW50Q2hlY2tib3hDbGljaykge1xuICAgICAgICAgICAgY29uc3QgeyBtaW5PcmRlciwgbWF4T3JkZXIgfSA9IHRoaXMuX2NhbGN1bGF0ZU9yZGVyUmFuZ2UoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tb3N0UmVjZW50Q2hlY2tib3hDbGljay5jaGVja2JveElkKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3JzLkNIRUNLQk9YRVMpO1xuXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNZXNzYWdlc0luQmV0d2VlbihcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzLCBtaW5PcmRlciwgbWF4T3JkZXIsIHRoaXMubW9zdFJlY2VudENoZWNrYm94Q2xpY2suaXNDaGVja2VkKTtcbiAgICAgICAgICAgIHRhcmdldC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsaWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vc3RSZWNlbnRDaGVja2JveENsaWNrID0ge1xuICAgICAgICAgICAgY2hlY2tib3hJZDogdGFyZ2V0LmlkLFxuICAgICAgICAgICAgaXNDaGVja2VkOiBEb21VdGlscy5pc0NoZWNrZWQodGFyZ2V0KVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggbWluT3JkZXIgYW5kIG1heE9yZGVyIG9mIHRoZSBtZXNzYWdlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBcbiAgICAgKiBjaGVja2JveGVzLlxuICAgICAqL1xuICAgIF9jYWxjdWxhdGVPcmRlclJhbmdlKGNoZWNrYm94MSwgY2hlY2tib3gyKSB7XG4gICAgICAgIGNvbnN0IG9yZGVyMSA9IHRoaXMuX2dldE9yZGVyKGNoZWNrYm94MSk7XG4gICAgICAgIGNvbnN0IG9yZGVyMiA9IHRoaXMuX2dldE9yZGVyKGNoZWNrYm94Mik7XG4gICAgICAgIGxldCBtaW5PcmRlcjtcbiAgICAgICAgbGV0IG1heE9yZGVyO1xuICAgICAgICBpZiAob3JkZXIxIDwgb3JkZXIyKSB7XG4gICAgICAgICAgICBtaW5PcmRlciA9IG9yZGVyMTtcbiAgICAgICAgICAgIG1heE9yZGVyID0gb3JkZXIyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWluT3JkZXIgPSBvcmRlcjI7XG4gICAgICAgICAgICBtYXhPcmRlciA9IG9yZGVyMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IG1pbk9yZGVyLCBtYXhPcmRlciB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpbXVsYXRlIGNsaWNrcyBvbiBtZXNzYWdlcyB0aGF0IGFyZSB2aXN1YWxseSBiZXR3ZWVuIHRoZSB0YXJnZXQgZWxlbWVudCBhbmQgXG4gICAgICogdGhlIG1vc3QgcmVjZW50bHkgY2xpY2tlZCBlbGVtZW50IChpbmNsdXNpdmUpIHMudC4gdGhlIGNoZWNrZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGF0IG9mIHRoZSBcbiAgICAgKiBtb3N0IHJlY2VudGx5IGNsaWNrZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBfc2VsZWN0TWVzc2FnZXNJbkJldHdlZW4oY2hlY2tib3hlcywgbWluT3JkZXIsIG1heE9yZGVyLCBpc0NoZWNrZWQpIHtcbiAgICAgICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyID0gRG9tVXRpbHMuZmluZE1lc3NhZ2VSb3coY2hlY2tib3gpLnN0eWxlLm9yZGVyO1xuICAgICAgICAgICAgaWYgKG1pbk9yZGVyIDw9IG9yZGVyICYmIFxuICAgICAgICAgICAgICAgIG9yZGVyIDw9IG1heE9yZGVyICYmIFxuICAgICAgICAgICAgICAgIGlzQ2hlY2tlZCAhPT0gRG9tVXRpbHMuaXNDaGVja2VkKGNoZWNrYm94KSkgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3guY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBvcmRlciBvZiB0aGUgZ2l2ZW4gY2hlY2tib3gncyBtZXNzYWdlLlxuICAgICAqL1xuICAgIF9nZXRPcmRlcihjaGVja2JveCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoRG9tVXRpbHMuZmluZE1lc3NhZ2VSb3coY2hlY2tib3gpLnN0eWxlLm9yZGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1aWNrU2VsZWN0SGFuZGxlcjtcbiIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBTZWxlY3RvcnMgfSBmcm9tICcuLi91dGlsL0NvbnN0YW50cyc7XG5pbXBvcnQgRG9tVXRpbHMgZnJvbSAnLi4vdXRpbC9Eb21VdGlscyc7XG5pbXBvcnQgeyBzdXBwb3J0c0J1bmRsaW5nIH0gZnJvbSAnLi4vdXRpbC9NZXNzYWdlUGFnZVV0aWxzJztcblxuY29uc3QgX2dldFRvcCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHdoZW4gbWVzc2FnZXMgYXJlIHN0YXJyZWQgb3IgdW5zdGFycmVkLlxuICovXG5jbGFzcyBTdGFySGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoYnVuZGxlZE1haWwsIHNlbGVjdGl2ZUJ1bmRsaW5nKSB7XG4gICAgICAgIHRoaXMuYnVuZGxlZE1haWwgPSBidW5kbGVkTWFpbDtcbiAgICAgICAgdGhpcy5zZWxlY3RpdmVCdW5kbGluZyA9IHNlbGVjdGl2ZUJ1bmRsaW5nO1xuICAgICAgICB0aGlzLnByZXZUb3AgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlU3RhcnJpbmcgPSB0aGlzLmhhbmRsZVN0YXJyaW5nLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHN0YXJyaW5nIG9yIHVuc3RhcnJpbmcuXG4gICAgICovXG4gICAgaGFuZGxlU3RhcnJpbmcoZSkge1xuICAgICAgICBpZiAoIXN1cHBvcnRzQnVuZGxpbmcod2luZG93LmxvY2F0aW9uLmhyZWYpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1N0YXJyaW5nID0gZS50YXJnZXQubWF0Y2hlcyhTZWxlY3RvcnMuVU5TVEFSUkVEKTtcbiAgICAgICAgY29uc3QgaXNVbnN0YXJyaW5nID0gZS50YXJnZXQubWF0Y2hlcyhTZWxlY3RvcnMuU1RBUlJFRCk7XG5cbiAgICAgICAgaWYgKCFpc1N0YXJyaW5nICYmICFpc1Vuc3RhcnJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgYXBwbGllcyB0byBidW5kbGVkIG1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VSb3cgPSBEb21VdGlscy5maW5kTWVzc2FnZVJvdyhlLnRhcmdldCk7XG4gICAgICAgIGNvbnN0IGxhYmVscyA9IHRoaXMuc2VsZWN0aXZlQnVuZGxpbmcuZmlsdGVyU3RyaW5ncyhEb21VdGlscy5nZXRMYWJlbHMobWVzc2FnZVJvdykpO1xuICAgICAgICBpZiAoIWxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlY29yZCB0aGUgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIGxldCBlbGVtZW50VG9wO1xuICAgICAgICAvLyBNZXNzYWdlIHRvcFxuICAgICAgICBpZiAoaXNVbnN0YXJyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bmRsZWRNYWlsLm9wZW5CdW5kbGUobGFiZWxzWzBdKTtcbiAgICAgICAgICAgIGVsZW1lbnRUb3AgPSBfZ2V0VG9wKG1lc3NhZ2VSb3cpO1xuICAgICAgICB9IFxuICAgICAgICAvLyBCdW5kbGUgcm93IHRvcFxuICAgICAgICBlbHNlIGlmIChpc1N0YXJyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuYnVuZGxlZE1haWwuZ2V0TGFiZWxPZk9wZW5lZEJ1bmRsZSgpO1xuICAgICAgICAgICAgY29uc3QgYnVuZGxlUm93ID0gdGhpcy5idW5kbGVkTWFpbC5nZXRCdW5kbGUobGFiZWwpLmdldEJ1bmRsZVJvdygpO1xuICAgICAgICAgICAgZWxlbWVudFRvcCA9IF9nZXRUb3AoYnVuZGxlUm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5TQ1JPTExBQkxFX0NPTlRBSU5FUik7XG4gICAgICAgIHRoaXMucHJldlRvcCA9IHNjcm9sbGFibGVDb250YWluZXIuc2Nyb2xsVG9wICsgX2dldFRvcChzY3JvbGxhYmxlQ29udGFpbmVyKSAtIGVsZW1lbnRUb3A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgbGlzdCBvZiBtZXNzYWdlcyB1cGRhdGVzIGFmdGVyIHN0YXJyaW5nL3Vuc3RhcnJpbmcgYSBtZXNzYWdlLCBhZGp1c3QgdGhlIHNjcm9sbFxuICAgICAqIHBvc2l0aW9uIHNvIHRoYXQgdGhlIG1lc3NhZ2UgcG9zaXRpb24gb24gdGhlIHNjcmVlbiBpcyBjbG9zZSB0byB3aGVyZSBpdCBwcmV2aW91c2x5IHdhcy5cbiAgICAgKiBcbiAgICAgKiBUaGUgc2FtZSBtZXNzYWdlIGNhbid0IGJlIGVhc2lseSByZXRyaWV2ZWQgYWZ0ZXIgcmVidW5kbGluZywgc28gZm9yIHVuc3RhcnJpbmcsIHNjcm9sbCB0b1xuICAgICAqIG1hdGNoIGJ1bmRsZSByb3cgd2l0aCB3aGVyZSB0aGUgbWVzc2FnZSB3YXMsIGFuZCBmb3Igc3RhcnJpbmcsIHNjcm9sbCB0byBtYXRjaCBidW5kbGUgcm93XG4gICAgICogd2hlcmUgdGhlIGJ1bmRsZSByb3cgd2FzLlxuICAgICAqL1xuICAgIHNjcm9sbElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuYnVuZGxlZE1haWwuZ2V0TGFiZWxPZk9wZW5lZEJ1bmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMucHJldlRvcCB8fCAhbGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ1bmRsZVJvdyA9IHRoaXMuYnVuZGxlZE1haWwuZ2V0QnVuZGxlKGxhYmVsKS5nZXRCdW5kbGVSb3coKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50VG9wID0gX2dldFRvcChidW5kbGVSb3cpO1xuICAgICAgICBjb25zdCBzY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3RvcnMuU0NST0xMQUJMRV9DT05UQUlORVIpO1xuICAgICAgICBzY3JvbGxhYmxlQ29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMucHJldlRvcCArIGVsZW1lbnRUb3AgLSBfZ2V0VG9wKHNjcm9sbGFibGVDb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMucHJldlRvcCA9IG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFySGFuZGxlcjtcbiIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBTZWxlY3RvcnMgfSBmcm9tICcuLi91dGlsL0NvbnN0YW50cyc7XG5cbi8qKlxuICogT2JzZXJ2ZSB0YWJwYW5lbHMgdG8gZGV0ZWN0IHdoZW4gdGhlIGN1cnJlbnQgaW5ib3ggdGFiIGNoYW5nZXMuXG4gKi9cbmNsYXNzIFRhYlBhbmVsc09ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaykgeyAgICAgICAgXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRNdXRhdGlvbnMgPSBtdXRhdGlvbnMuZmlsdGVyKG0gPT4gbS50YXJnZXQubWF0Y2hlcyhTZWxlY3RvcnMuVEFCUEFORUxTKSk7XG5cbiAgICAgICAgICAgIGlmIChmaWx0ZXJlZE11dGF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmaWx0ZXJlZE11dGF0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9ic2VydmUoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3JzLk1BSU4pO1xuICAgICAgICB0aGlzLm1haW5QYXJlbnQgPSBtYWluLnBhcmVudE5vZGU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLm1haW5QYXJlbnQsIHsgXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLCBcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsIFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYlBhbmVsc09ic2VydmVyOyIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBcbiAgICBJbmJveHlDbGFzc2VzLFxuICAgIFNlbGVjdG9ycyxcbn0gZnJvbSAnLi4vdXRpbC9Db25zdGFudHMnO1xuXG4vKipcbiAqIEhhbmRsZXMgY2hhbmdlcyBpbiBHbWFpbCB0aGVtZXMgYW5kIHVwZGF0ZXMgaW5ib3h5IHRoZW1lIHN0eWxpbmcgYWNjb3JkaW5nbHkuXG4gKi9cbmNsYXNzIFRoZW1lQ2hhbmdlSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiB0aGUgdGhlbWUgaXMgdXBkYXRlZCwgdGhlIGNvbnRlbnRzIG9mIGEgc3R5bGUgdGFnIGFyZSB1cGRhdGVkXG4gICAgICAgICAgICBpZiAobXV0YXRpb25zLnNvbWUobSA9PiBtLnRhcmdldC50YWdOYW1lID09PSAnU1RZTEUnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5VGhlbWUoKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2JzZXJ2ZSBhbmQgcmVhY3QgdG8gdGhlbWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBvYnNlcnZlKCkge1xuICAgICAgICB0aGlzLl9hcHBseVRoZW1lKCk7XG5cbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKSwgeyBcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLCBcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSwgXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZS1hcHBseSB0aGVtZSBvbiBoYXNoY2hhbmdlLCBzaW5jZSBtZXNzYWdlcy1kYXJrLXRoZW1lIHJlbGllcyBvblxuICAgICAgICAvLyBtZXNzYWdlcyBiZWluZyBwcmVzZW50IG9uIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBlID0+IHRoaXMuX2FwcGx5VGhlbWUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbHkgdGhlIGFwcHJvcHJpYXRlIGxpZ2h0L2RhcmsgdGhlbWUgc3R5bGluZywgc28gdGhhdCBpbmJveHkgdGhlbWluZyBtYXRjaGVzIEdtYWlsLlxuICAgICAqL1xuICAgIF9hcHBseVRoZW1lKCkge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xuICAgICAgICBjb25zdCBzaWRlcGFuZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5TSURFUEFORV9URVhUKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzTGlnaHQoZ2V0Q29tcHV0ZWRTdHlsZShzaWRlcGFuZVRleHQpLmNvbG9yKSkge1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKEluYm94eUNsYXNzZXMuREFSS19USEVNRSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoSW5ib3h5Q2xhc3Nlcy5EQVJLX1RIRU1FKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5TQU1QTEVfTUVTU0FHRSk7XG4gICAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faXNMaWdodChnZXRDb21wdXRlZFN0eWxlKG1lc3NhZ2UpLmJhY2tncm91bmRDb2xvcikpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChJbmJveHlDbGFzc2VzLk1FU1NBR0VTX0RBUktfVEhFTUUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKEluYm94eUNsYXNzZXMuTUVTU0FHRVNfREFSS19USEVNRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVzc2FnZS5jbGllbnRIZWlnaHQgPD0gMjgpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnY29tcGFjdCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wYWN0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjb2xvciByZXByZXNlbnRlZCBieSB0aGUgcmdiIHN0cmluZyBpcyBjbG9zZXIgdG8gd2hpdGUgdGhhbiB0byBibGFjay5cbiAgICAgKi9cbiAgICBfaXNMaWdodChyZ2JTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcmdiID0gdGhpcy5fcmdiU3RyaW5nVG9SZ2IocmdiU3RyaW5nKTtcbiAgICAgICAgY29uc3QgaW50ZW5zaXR5ID0gdGhpcy5fcmdiVG9HcmF5c2NhbGUocmdiKTtcblxuICAgICAgICByZXR1cm4gaW50ZW5zaXR5ID4gKDI1NSAvIDIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGFuIHJnYihhKSBzdHJpbmcsIGV4LiAncmdiKDI0MywgMTI4LCA0KScgb3IgJ3JnYmEoMjQzLCAxMjgsIDQsIDAuOCknLCB0byBhbiBcbiAgICAgKiBhcnJheSBvZiByZ2IgdmFsdWVzLiBUaGUgYWxwaGEgdmFsdWUgaXMgZGlzY2FyZGVkLlxuICAgICAqL1xuICAgIF9yZ2JTdHJpbmdUb1JnYihyZ2JTdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgb3BlblBhcmVuSW5kZXggPSByZ2JTdHJpbmcuaW5kZXhPZignKCcpO1xuICAgICAgICBjb25zdCByZ2JWYWx1ZXMgPSByZ2JTdHJpbmcuc3Vic3RyaW5nKG9wZW5QYXJlbkluZGV4ICsgMSwgcmdiU3RyaW5nLmxlbmd0aCAtIDEpO1xuICAgICAgICByZXR1cm4gcmdiVmFsdWVzLnNwbGl0KCcsJykubWFwKHMgPT4gcGFyc2VJbnQocy50cmltKCkpKS5zbGljZSgwLCAzKTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogQ29udmVydHMgYW4gYXJyYXkgb2YgUkdCIHZhbHVlcyB0byBncmF5c2NhbGUgaW50ZW5zaXR5IHZhbHVlLlxuICAgICAqL1xuICAgIF9yZ2JUb0dyYXlzY2FsZShyZ2IpIHtcbiAgICAgICAgcmV0dXJuIChyZ2JbMF0gKyByZ2JbMV0gKyByZ2JbMl0pIC8gMztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRoZW1lQ2hhbmdlSGFuZGxlcjsiLCIvLyBpbmJveHk6IENocm9tZSBleHRlbnNpb24gZm9yIEdvb2dsZSBJbmJveC1zdHlsZSBidW5kbGVzIGluIEdtYWlsLlxuLy8gQ29weXJpZ2h0IChDKSAyMDIwICBUZXJlc2EgT3VcblxuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuLyoqXG4gKiBUaGUgYW1vdW50IHRoYXQgdGhlIG9yZGVyIHByb3BlcnR5IGlzIGluY3JlbWVudGVkIGJ5LFxuICogZm9yIG5vbi1idW5kbGVkLW1lc3NhZ2UgZWxlbWVudHMuIFxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIGVxdWFsIHRvIChvciBncmVhdGVyIHRoYW4pIHRoZSBtYXhpbXVtIG51bWJlciBvZiBtZXNzYWdlcyBwZXIgcGFnZSxcbiAqIHNpbmNlIHdlIHJlc2VydmUgdGhlIG9yZGVyIG51bWJlcnMgaW4gYmV0d2VlbiB0aGUganVtcHMgZm9yIGJ1bmRsZWQgbWVzc2FnZXMuIFxuICogKFdvcnN0IGNhc2UsIGFsbCBtZXNzYWdlcyBvbiBhIHBhZ2Ugc2hhcmUgYSBjb21tb24gbGFiZWwsIGFuZCBhbGwgYmVsb25nIGluIHRoZSBzYW1lIGJ1bmRsZS4pXG4gKi9cbmNvbnN0IE9SREVSX0lOQ1JFTUVOVCA9IDEwMDtcblxuY29uc3QgTk9fVEFCID0gJ19fTk9fVEFCJztcblxuY29uc3QgR21haWxDbGFzc2VzID0ge1xuICAgIEFSQ0hJVkVfQlVUVE9OOiAnYnJxIGJxWCcsXG4gICAgQ0VMTDogJ3hZJyxcbiAgICBEQVRFX0NFTEw6ICd4VycsXG4gICAgSU1QT1JUQU5DRV9NQVJLRVI6ICdXQScsXG4gICAgUEVSU09OQUxfTEVWRUxfSU5ESUNBVE9SOiAnYm5rJyxcbiAgICBSRUFEOiAneU8nLFxuICAgIFJPVzogJ3pBJyxcbiAgICBTRUxFQ1RFRDogJ3g3JyxcbiAgICBTTk9PWkVEOiAnY0wnLFxuICAgIFNUQVJSRUQ6ICdULUtULUpwJyxcbiAgICBTVUJKRUNUX0NFTEw6ICdhNFcnLFxuICAgIFVOUkVBRDogJ3pFJyxcbiAgICBVTlJFQURfU0VOREVSOiAnekYnLFxufTtcblxuY29uc3QgSW5ib3h5Q2xhc3NlcyA9IHtcbiAgICBCVU5ETEVfUk9XOiAnYnVuZGxlLXJvdycsXG4gICAgQlVORExFRF9NRVNTQUdFOiAnYnVuZGxlZC1tZXNzYWdlJyxcbiAgICBEQVJLX1RIRU1FOiAnZGFyay10aGVtZScsXG4gICAgTUVTU0FHRVNfREFSS19USEVNRTogJ21lc3NhZ2VzLWRhcmstdGhlbWUnLFxuICAgIElOQk9YWTogJ2luYm94eScsXG4gICAgTEFTVDogJ2xhc3QnLFxuICAgIFNIT1dfUElOTkVEX1RPR0dMRTogJ3Nob3ctcGlubmVkLXRvZ2dsZScsXG4gICAgVklFV19BTExfTElOSzogJ3ZpZXctYWxsLWxpbmsnLFxuICAgIFZJU0lCTEU6ICd2aXNpYmxlJyxcbn07XG5cbmNvbnN0IFBBR0UgPSAnLkJsdEhrZS5uSC5veThNYmYnO1xuY29uc3QgTUFJTiA9IGBbcm9sZT1cIm1haW5cIl1gO1xuY29uc3QgQ1VSUkVOVF9UQUJQQU5FTCA9IGAke01BSU59IC5hZTQ6bm90KFtzdHlsZSo9XCJub25lXCJdKWA7XG5jb25zdCBQT1NTSUJMRV9NRVNTQUdFX0xJU1RTID0gYCR7Q1VSUkVOVF9UQUJQQU5FTH0gLkNwYDsgXG5jb25zdCBMQUJFTFMgPSBgLmFyLmFzIC5hdGA7XG5jb25zdCBTZWxlY3RvcnMgPSB7XG4gICAgQ0hFQ0tCT1hFUzogYCR7Q1VSUkVOVF9UQUJQQU5FTH0gdHIgdGQgLm9aLWpjLlQtSm8uSi1KNS1KaWAsXG4gICAgQ1VSUkVOVF9UQUI6IGAke01BSU59IFtyb2xlPVwidGFiXCJdW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdYCxcbiAgICBDVVJSRU5UX1RBQlBBTkVMOiBDVVJSRU5UX1RBQlBBTkVMLFxuICAgIElOQk9YX0xBQkVMOiBgJHtMQUJFTFN9W3RpdGxlPVwiSW5ib3hcIl1gLFxuICAgIElOQk9YWTogYC4ke0luYm94eUNsYXNzZXMuSU5CT1hZfWAsXG4gICAgTEFCRUxfTEVBRjogJy5hdSAuYXYnLFxuICAgIExBQkVMX0NPTlRBSU5FUlM6ICcuYXIuYXMnLFxuICAgIExBQkVMUzogTEFCRUxTLFxuICAgIElNUE9SVEFOQ0VfTUFSS0VSOiBgLiR7R21haWxDbGFzc2VzLlJPV30gLiR7R21haWxDbGFzc2VzLklNUE9SVEFOQ0VfTUFSS0VSfWAsXG4gICAgSU5CT1hfVEFCOiAnLlRPW2RhdGEtdG9vbHRpcD1cIkluYm94XCJdJyxcbiAgICBNQUlOOiBNQUlOLFxuICAgIE1FU1NBR0VfQ0hFQ0tCT1g6ICcub1otamMuVC1Kby5KLUo1LUppJyxcbiAgICBNRVNTQUdFX0RBVEU6ICcueFcgc3BhbicsXG4gICAgTUVTU0FHRV9EQVRFX1NQQU46IGAueFcgc3BhbiBzcGFuYCxcbiAgICBNRVNTQUdFX1NOT09aRURfVEVYVDogYC5ieVoueFkgLmNMYCxcbiAgICBQT1NTSUJMRV9NRVNTQUdFX0xJU1RTOiBQT1NTSUJMRV9NRVNTQUdFX0xJU1RTLFxuICAgIFBBR0U6IFBBR0UsXG4gICAgUEFHRUNIQU5HSU5HX0JVVFRPTlM6ICcuYXI1IC5EaSAqJyxcbiAgICBQRVJTT05BTF9MRVZFTF9JTkRJQ0FUT1I6ICAgXG4gICAgICAgIGAuJHtHbWFpbENsYXNzZXMuUk9XfSA+IC4ke0dtYWlsQ2xhc3Nlcy5QRVJTT05BTF9MRVZFTF9JTkRJQ0FUT1J9Om5vdCguYnl2KWAsXG4gICAgUkVBRF9NRVNTQUdFOiBgdHIuJHtHbWFpbENsYXNzZXMuUk9XfS4ke0dtYWlsQ2xhc3Nlcy5SRUFEfWAsXG4gICAgUkVGUkVTSDogJy5ULUkuSi1KNS1KaVthY3Q9XCIyMFwiXScsXG4gICAgU0FNUExFX01FU1NBR0U6IGAke1BPU1NJQkxFX01FU1NBR0VfTElTVFN9IHRyLiR7R21haWxDbGFzc2VzLlJPV30uJHtHbWFpbENsYXNzZXMuUkVBRH06bm90KC5idW5kbGVkLW1lc3NhZ2UpYCxcbiAgICBTRUFSQ0hfRk9STTogJyNnYiBmb3JtJyxcbiAgICBTRUxFQ1RFRDogYCR7Q1VSUkVOVF9UQUJQQU5FTH0gdHIuJHtHbWFpbENsYXNzZXMuU0VMRUNURUR9Om5vdCguJHtJbmJveHlDbGFzc2VzLkJVTkRMRV9ST1d9KWAsXG4gICAgU0VOREVSUzogJy55WC54WSAueVcgLmJBNCBzcGFuW2VtYWlsXScsXG4gICAgU0NST0xMQUJMRV9DT05UQUlORVI6ICcuVG0uYWVKJyxcbiAgICBTSURFUEFORV9URVhUOiAnLlRPIC5uVScsXG4gICAgU1RBUlJFRDogYC5ULUtULiR7R21haWxDbGFzc2VzLlNUQVJSRUR9YCxcbiAgICBUQUI6IGAke01BSU59IFtyb2xlPVwidGFiXCJdYCxcbiAgICBUQUJQQU5FTFM6IGAke01BSU59IFtyb2xlPVwidGFicGFuZWxcIl1gLFxuICAgIFRBQkxFX0JPRFk6IGAuRiB0Ym9keWAsXG4gICAgVE9PTEJBUl9BUkNISVZFX0JVVFRPTjogYC5HLWF0Yjpub3QoW3N0eWxlKj1cIm5vbmVcIl0pIC5ULUkuSi1KNS1KaVthY3Q9XCI3XCJdYCxcbiAgICBVTlNUQVJSRUQ6IGAuVC1LVC5hWHdgLFxufTtcblxuLy8gU2VsZWN0b3JzIGZvciBlbGVtZW50cyBhc3N1bWluZyB3ZSBhcmUgc2VsZWN0aW5nIHdpdGhpbiBUQUJMRV9CT0RZXG5jb25zdCBUYWJsZUJvZHlTZWxlY3RvcnMgPSB7XG4gICAgTUVTU0FHRV9OT0RFUzogYHRyLiR7R21haWxDbGFzc2VzLlJPV31gLFxufTtcblxuY29uc3QgVXJscyA9IHtcbiAgICBTVEFSUkVEX1BBR0VfSEFTSDogJ3NlYXJjaC9pcyUzQXN0YXJyZWQrbGFiZWwlM0FpbmJveCcsXG59O1xuXG5jb25zdCBFbGVtZW50ID0ge1xuICAgIERBVEVfRElWSURFUjogMSxcbiAgICBCVU5ETEU6IDIsXG4gICAgVU5CVU5ETEVEX01FU1NBR0U6IDMsXG59O1xuXG5leHBvcnQgeyBcbiAgICBPUkRFUl9JTkNSRU1FTlQsIFxuICAgIE5PX1RBQixcbiAgICBHbWFpbENsYXNzZXMsIFxuICAgIEluYm94eUNsYXNzZXMsXG4gICAgU2VsZWN0b3JzLCBcbiAgICBUYWJsZUJvZHlTZWxlY3RvcnMsXG4gICAgVXJscyxcbiAgICBFbGVtZW50LFxufTtcbiIsIi8vIGluYm94eTogQ2hyb21lIGV4dGVuc2lvbiBmb3IgR29vZ2xlIEluYm94LXN0eWxlIGJ1bmRsZXMgaW4gR21haWwuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMjAgIFRlcmVzYSBPdVxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyBcbiAgICBHbWFpbENsYXNzZXMsIFxuICAgIFNlbGVjdG9ycyxcbn0gZnJvbSAnLi9Db25zdGFudHMnO1xuXG5jb25zdCBEb21VdGlscyA9IHtcbiAgICBmaW5kTWVzc2FnZVJvdzogZnVuY3Rpb24obWVzc2FnZVJvd0Rlc2NlbmRhbnQpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VSb3dEZXNjZW5kYW50LmNsb3Nlc3QoJ3RyJyk7XG4gICAgfSxcblxuICAgIGV4dHJhY3REYXRlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3JzLk1FU1NBR0VfREFURSkudGl0bGVcbiAgICB9LFxuXG4gICAgaXNDaGVja2VkOiBmdW5jdGlvbihjaGVja2JveE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrYm94Tm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcpID09PSAndHJ1ZSc7XG4gICAgfSxcblxuICAgIGdldExhYmVsczogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gWy4uLm1lc3NhZ2UucXVlcnlTZWxlY3RvckFsbChTZWxlY3RvcnMuTEFCRUxTKV07XG4gICAgfSxcblxuICAgIC8qKiBTbGljZSBlbnRyaWVzIG91dCBvZiBhbiBvYmplY3QuICovXG4gICAgc2xpY2U6IGZ1bmN0aW9uKHNyYywgLi4ua2V5cykge1xuICAgICAgICBjb25zdCBkc3QgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgICAgICAgIGRzdFtrXSA9IHNyY1trXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHN0O1xuICAgIH0sXG5cbiAgICBnZXRDU1M6IGZ1bmN0aW9uKGVsZW1lbnQsIC4uLmNzc0F0dHJpYnV0ZXMpIHtcbiAgICAgICAgY29uc3QgY3NzT2JqID0ge307XG4gICAgICAgIGNvbnN0IGNzbSA9IGVsZW1lbnQuY29tcHV0ZWRTdHlsZU1hcCgpO1xuICAgICAgICBmb3IgKGxldCBzdHkgb2YgY3NzQXR0cmlidXRlcykge1xuICAgICAgICAgICAgY3NzT2JqW3N0eV0gPSBjc20uZ2V0KHN0eSkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3NzT2JqO1xuICAgIH0sXG5cbiAgICBzdHlsZUZvcjogZnVuY3Rpb24oY3NzT2JqKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IE9iamVjdC5lbnRyaWVzKGNzc09iaikubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9O2ApLmpvaW4oXCJcXG5cXHRcIik7XG4gICAgICAgIGNvbnN0IFtoYXNTaW5nbGVRdW90ZSwgaGFzRG91YmxlUXVvdGVdID0gW1wiJ1wiLCAnXCInXS5tYXAocSA9PiBjc3MuaW5kZXhPZihxKSA+IC0xKTtcbiAgICAgICAgaWYgKGhhc1NpbmdsZVF1b3RlICYmIGhhc0RvdWJsZVF1b3RlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjsgIC8vIFNhZmVseS1wdW50IG9uIHNhZmVseS1xdW90aW5nIHRoZSBjc3MuXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzU2luZ2xlUXVvdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBgc3R5bGU9XCIke2Nzc31cImA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYHN0eWxlPScke2Nzc30nYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBodG1sVG9FbGVtZW50OiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIGh0bWwgPSBodG1sLnRyaW0oKTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvbVV0aWxzO1xuIiwiLy8gaW5ib3h5OiBDaHJvbWUgZXh0ZW5zaW9uIGZvciBHb29nbGUgSW5ib3gtc3R5bGUgYnVuZGxlcyBpbiBHbWFpbC5cbi8vIENvcHlyaWdodCAoQykgMjAyMCAgVGVyZXNhIE91XG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuLy8gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3Jcbi8vIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbi8vIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IFxuICAgIFNlbGVjdG9ycyxcbiAgICBOT19UQUIsXG4gICAgVXJscyxcbn0gZnJvbSAnLi9Db25zdGFudHMnO1xuXG4vKipcbiAqIEdldCB0aGUgbWVzc2FnZSBwYWdlIG51bWJlciBvZiB0aGUgZ2l2ZW4gdXJsLlxuICovXG5mdW5jdGlvbiBnZXRQYWdlTnVtYmVyKHVybCkge1xuICAgIGNvbnN0IGhhc2ggPSBfZ2V0SGFzaCh1cmwpO1xuICAgIGlmIChfbWF0Y2hlc1BhZ2UxKGhhc2gpKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoZXNQYWdlWCA9IF9tYXRjaGVzUGFnZVgoaGFzaCk7XG4gICAgaWYgKG1hdGNoZXNQYWdlWCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQobWF0Y2hlc1BhZ2VYWzFdKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCB0aGUgbWVzc2FnZSBwYWdlIG51bWJlciBvZiB0aGUgY3VycmVudCB1cmwuXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRQYWdlTnVtYmVyKCkge1xuICAgIHJldHVybiBnZXRQYWdlTnVtYmVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IHRhYi5cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFRhYigpIHtcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9ycy5DVVJSRU5UX1RBQik7XG4gICAgcmV0dXJuIHRhYiA/IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA6IE5PX1RBQjsgXG59XG5cbi8qKlxuICogV2hldGhlciBtZXNzYWdlcyBzaG91bGQgYmUgYnVuZGxlZCBvbiB0aGUgcGFnZS5cbiAqL1xuZnVuY3Rpb24gc3VwcG9ydHNCdW5kbGluZyh1cmwpIHtcbiAgICBpZiAoIXVybC5pbmNsdWRlcygnIycpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2ggPSBfZ2V0SGFzaCh1cmwpO1xuICAgIHJldHVybiBfbWF0Y2hlc1BhZ2UxKGhhc2gpIHx8ICEhX21hdGNoZXNQYWdlWChoYXNoKTtcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRoZSBnaXZlbiB1cmwgaXMgZm9yIHNob3dpbmcgYWxsIHN0YXJyZWQgKHBpbm5lZCkgbWVzc2FnZXMgdGhhdCBhcmVcbiAqIGluIHRoZSBpbmJveC5cbiAqL1xuZnVuY3Rpb24gaXNTdGFycmVkUGFnZSh1cmwpIHtcbiAgICByZXR1cm4gdXJsLmluY2x1ZGVzKCcjJykgJiZcbiAgICAgICAgKF9tYXRjaGVzU3RhcnJlZFBhZ2UxKF9nZXRIYXNoKHVybCkpIHx8ICEhX21hdGNoZXNTdGFycmVkUGFnZVgoX2dldEhhc2godXJsKSkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBhcnQgb2YgdGhlIGN1cnJlbnQgdXJsIHRoYXQgcHJlY2VkZXMgJyMnLlxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50QmFzZVVybCgpIHtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCBwYXJ0cyA9IHVybC5zcGxpdCgnIycpO1xuICAgIHJldHVybiBwYXJ0c1swXTtcbn1cblxuZnVuY3Rpb24gX2dldEhhc2godXJsKSB7XG4gICAgY29uc3QgaGFzaCA9IHVybC5zcGxpdCgnIycpWzFdO1xuICAgIC8vICMgbWlnaHQgYmUgZm9sbG93ZWQgYnkgP1xuICAgIGNvbnN0IGluZGV4ID0gaGFzaC5pbmRleE9mKCc/Jyk7XG5cbiAgICByZXR1cm4gaW5kZXggPiAwID8gaGFzaC5zdWJzdHJpbmcoMCwgaW5kZXgpIDogaGFzaDtcbn1cblxuZnVuY3Rpb24gX21hdGNoZXNQYWdlMShoYXNoKSB7XG4gICAgcmV0dXJuIGhhc2ggPT09ICdpbmJveCc7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaGVzUGFnZVgoaGFzaCkge1xuICAgIHJldHVybiBoYXNoLm1hdGNoKC9eaW5ib3hcXC9wKFxcZCspJC8pO1xufVxuXG5mdW5jdGlvbiBfbWF0Y2hlc1N0YXJyZWRQYWdlMShoYXNoKSB7XG4gICAgcmV0dXJuIGhhc2ggPT09IFVybHMuU1RBUlJFRF9QQUdFX0hBU0g7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaGVzU3RhcnJlZFBhZ2VYKGhhc2gpIHtcbiAgICByZXR1cm4gaGFzaC5tYXRjaCgvXnNlYXJjaFxcL2lzJTNBc3RhcnJlZFxcK2xhYmVsJTNBaW5ib3hcXC9wKFxcZCspJC8pXG59XG5cbmV4cG9ydCB7XG4gICAgZ2V0Q3VycmVudFBhZ2VOdW1iZXIsIFxuICAgIGdldFBhZ2VOdW1iZXIsXG4gICAgZ2V0Q3VycmVudFRhYixcbiAgICBzdXBwb3J0c0J1bmRsaW5nLFxuICAgIGlzU3RhcnJlZFBhZ2UsXG4gICAgZ2V0Q3VycmVudEJhc2VVcmwsXG59OyJdLCJzb3VyY2VSb290IjoiIn0=