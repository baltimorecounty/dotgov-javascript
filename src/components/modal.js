import "../polyfills/closest.polyfill";
import "./w3-dialog";
import { GetFirstElementOrDefault } from "../utilities/dom.utils";

const cssClasses = {
  active: "active",
  modalCloseButton: "dg_modal__close-button",
  modalOpenButton: "dg_modal__open-button",
  modalOverlay: "dialog-backdrop",
  /** overlay is transparent gray section around the modal */
  canCloseOnOverlayClick: "can-dismiss"
};

const selectors = {
  activeDismissibleModal: ".dg_modal[data-dismissible]"
};

/**
 * Handle the modal overlay click.
 * The modal markup will determine whether or not the modal can close on overlay click
 * based on whether it has the data-dismissible data attribute.
 * @param {element:click} clickEvent - the observable overlay click event
 * @listens element:click
 */
const handleActiveOverlayClick = clickEvent => {
  const activeDismissibleModal = GetFirstElementOrDefault(
    document,
    selectors.activeDismissibleModal
  );

  if (activeDismissibleModal) {
    /** The  w3 logic we used requires the close button to be passed into the closeDialog function */
    const closeButton = GetFirstElementOrDefault(
      activeDismissibleModal,
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
 * @param {document:click} clickEvent - the observable click event
 * @listens document:click
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
    targetClassList.contains(`${cssClasses.modalOverlay}`) &&
    targetClassList.contains(`${cssClasses.active}`);

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
