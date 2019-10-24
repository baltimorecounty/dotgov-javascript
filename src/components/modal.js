import "../polyfills/closest.polyfill";
import "./w3-dialog";
import { GetFirstElementOrDefault } from "../utilities/dom.utils";

const cssClasses = {
  modalCloseButton: "dg_modal__close-button",
  modalOpenButton: "dg_modal__open-button",
  /** overlay is transparent gray section around the modal */
  canCloseOnOverlayClick: "can-dismiss"
};

/**
 * Handle the modal overlay click.
 * The modal markup will determine whether or not the modal can close on overlay click
 * based on whether it has the data-dismissible data attribute.
 * @param {*} clickEvent
 */
const handleActiveOverlayClick = clickEvent => {
  const activeModalElm = GetFirstElementOrDefault(
    document,
    ".dg_modal[data-dismissible]"
  );

  if (activeModalElm) {
    const closeButton = GetFirstElementOrDefault(
      activeModalElm,
      `.${cssClasses.modalCloseButton}`
    );

    try {
      window.closeDialog(closeButton);
    } catch (ex) {
      console.error(
        "No modal close button specified, please check the docs to ensure this button exists"
      );
    }
  }
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
  const isOverlayClick =
    targetClassList.contains(`dialog-backdrop`) &&
    targetClassList.contains(`active`);

  if (isModalOpenButtonClick) {
    handleModalOpenButtonClick(clickEvent);
  } else if (isModalCloseButtonClick) {
    handleModalCloseButtonClick(clickEvent);
  } else if (isOverlayClick) {
    handleActiveOverlayClick(clickEvent);
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
