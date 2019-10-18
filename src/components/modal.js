import A11yDialog from "a11y-dialog";

const initializeModal = modalElm => {
  const dialog = modalElm;
  new A11yDialog(dialog);
};

document.addEventListener("DOMContentLoaded", onContentLoadedEvent => {
  const modalClass = "dg_modal";
  const modalElms = document.querySelectorAll(`[class*=${modalClass}]`);
  modalElms.forEach(initializeModal);
});
