import "../polyfills/closest.polyfill";
import "./w3-dialog";

const cssClasses = {
  modalCloseButton: "dg_modal__close-button",
  modalOpenButton: "dg_modal__open-button"
};

/**
 * Captures all dom click events in order to bind all event with a particular class
 * @param {*} clickEvent
 */
const handleDocumentClick = clickEvent => {
  const { classList: targetClassList } = clickEvent.target;
  // If the clicked element doesn't have the right selector, bail
  const isModalOpenButtonClick = targetClassList.contains(
    cssClasses.modalOpenButton
  );
  const isModalCloseButtonClick =
    targetClassList.contains(cssClasses.modalCloseButton) ||
    !!clickEvent.target.closest(`.${cssClasses.modalCloseButton}`);

  if (isModalOpenButtonClick) {
    handleModalOpenButtonClick(clickEvent);
  } else if (isModalCloseButtonClick) {
    handleModalCloseButtonClick(clickEvent);
  } else {
    return;
  }
};

/**
 * Closes the closest modal
 * @param {*} clickEvent
 */
const handleModalCloseButtonClick = clickEvent => {
  window.closeDialog(clickEvent.target);
};

/**
 * Opens the modal that matches it's id to data-target attribute of the open button
 * @param {*} clickEvent
 */
const handleModalOpenButtonClick = clickEvent => {
  const modalButtonElm = clickEvent.target;
  const targetModalId = modalButtonElm.getAttribute("data-target");
  window.openDialog(targetModalId, modalButtonElm);
};

document.addEventListener("click", handleDocumentClick, false);
