export function createComposeButton() {
    const floatingComposeButton = document.createElement("div");
    floatingComposeButton.className = "floating-compose";
    floatingComposeButton.addEventListener("click", function () {
      // TODO: Replace all of the below with gmail.compose.start_compose() via the Gmail.js lib
      const composeButton = document.querySelector(".T-I.T-I-KE.L3");
      composeButton.click();
    });
    document.body.appendChild(floatingComposeButton);
}

