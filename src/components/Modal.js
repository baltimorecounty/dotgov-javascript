import "../polyfills/closest.polyfill";
import "./w3-dialog";
import { GetFirstElementOrDefault } from "../utilities/dom.utilities";

const cssClasses = {
  active: "active",
  modalCloseButton: "dg_modal__close-button",
  modalOpenButton: "dg_modal__open-button",
  modalOverlay: "dialog-backdrop",
  /** overlay is transparent gray section around the modal */
  canCloseOnOverlayClick: "can-dismiss",
};

const selectors = {
  activeDismissibleModal: ".dg_modal[data-dismissible]",
};

/**
 * Hide the main site navigation button by reducing its z-index value when opening the
 * modal so the button doesn't appear on top of it.
 */
const hideNavButton = () => {
  var windowWidth = $(window).width();
  var fakeSiteButton = document.getElementById("bc_site-nav__toggle-button");
  if (fakeSiteButton) {
    if (windowWidth <= 900) {
      fakeSiteButton.style.zIndex = "0";
    } else {
      fakeSiteButton.style.zIndex = "2147483647";
    }
  }
};

/**
 * Restore the main site navigation button to its original z-index so it reappears when
 * the modal is closed.
 */
const showNavButton = () => {
  var fakeSiteButton = document.getElementById("bc_site-nav__toggle-button");
  if (fakeSiteButton) {
    fakeSiteButton.style.zIndex = "2147483647";
  }
};

/**
 * Handle the modal overlay click.
 * The modal markup will determine whether or not the modal can close on overlay click
 * based on whether it has the data-dismissible data attribute.
 * @param {element:click} clickEvent - the observable overlay click event
 * @listens element:click
 */
const handleActiveOverlayClick = (clickEvent) => {
  const activeDismissibleModalElm = GetFirstElementOrDefault(
    document,
    selectors.activeDismissibleModal
  );
  const isDismissible =
    activeDismissibleModalElm &&
    activeDismissibleModalElm.getAttribute("data-dismissible") !== "false";

  if (isDismissible) {
    /** The  w3 logic we used requires the close button to be passed into the closeDialog function */
    const closeButton = GetFirstElementOrDefault(
      activeDismissibleModalElm,
      `.${cssClasses.modalCloseButton}`
    );
    showNavButton();
    window.closeDialog(closeButton);
  }
};

/**
 * Captures all dom click events in order to bind all event with a particular class
 * @param {document:click} clickEvent - the observable click event
 * @listens document:click
 */
const handleDocumentClick = (clickEvent) => {
  const { classList: targetClassList } = clickEvent.target;
  // If the clicked element doesn't have the right selector, bail
  const isModalOpenButtonClick = targetClassList.contains(
    cssClasses.modalOpenButton
  );
  const isModalCloseButtonClick =
    targetClassList.contains(cssClasses.modalCloseButton) ||
    !!clickEvent.target.closest(`.${cssClasses.modalCloseButton}`);
  const isOverlayClick =
    targetClassList.contains(cssClasses.modalOverlay) &&
    targetClassList.contains(cssClasses.active);

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
const handleModalCloseButtonClick = (clickEvent) => {
  showNavButton();
  window.closeDialog(clickEvent.target);
  if (isIos()) {
    scrollWithinPage();
  }
};

/**
 * Opens the modal that matches it's id to data-target attribute of the open button
 * @param {*} clickEvent
 */
const handleModalOpenButtonClick = (clickEvent) => {
  const modalButtonElm = clickEvent.target;
  const targetModalId = modalButtonElm.getAttribute("data-target");

  window.openDialog(targetModalId, modalButtonElm);
  hideNavButton();

  if (isIos()) {
    handleIosWindowResize();
    scrollWithinModal();
  }
};

function isIos() {
  return (
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  );
}

function handleIosWindowResize() {
  var backdrop = document.getElementsByClassName("dialog-backdrop")[0];
  //Update top of modal to current scroll location in order to match display height
  backdrop.style.top = $(window).scrollTop() + "px";
  $(window).resize(function () {
    //Update top of modal again on window resize i.e. the lower Safari menu appearing
    backdrop.style.top = $(window).scrollTop() + "px";
  });
}

function scrollWithinModal() {
  //Remove existing event listeners https://stackoverflow.com/a/34245613
  var button = document.querySelector("#dg_back-to-top");
  button.parentNode.replaceChild(button.cloneNode(1), button);
  $("#dg_back-to-top").on("click", function (e) {
    e.preventDefault();
    //Scroll to the top of the dialog instead of the page to prevent scrolling past the dialog
    $(".dialog-backdrop").animate(
      {
        scrollTop: 0,
      },
      700
    );
  });
}

function scrollWithinPage() {
  //Remove existing event listeners https://stackoverflow.com/a/34245613
  var button = document.querySelector("#dg_back-to-top");
  button.parentNode.replaceChild(button.cloneNode(1), button);
  $("#dg_back-to-top").on("click", function (e) {
    e.preventDefault();
    //Put the original behavior of "scrolling to the top of the page" back
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      700
    );
  });
}

document.addEventListener("click", handleDocumentClick, false);
