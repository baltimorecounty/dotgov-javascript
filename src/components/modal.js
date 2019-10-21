import "./w3-dialog";

const handleDocumentClick = clickEvent => {
  const { classList: targetClassList } = clickEvent.target;
  // If the clicked element doesn't have the right selector, bail
  const isModalOpenButtonClick = targetClassList.contains(
    "dg_modal__open-button"
  );
  const isModalCloseButtonClick = targetClassList.contains(
    "dg_modal__close-button"
  );

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
