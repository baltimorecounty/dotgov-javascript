import {
  AddClassToElms,
  GetFirstElementOrDefault,
  RemoveClassFromElms,
  SetAttributeForElms,
} from "../utilities/dom.utilities";

import FocusTrap from "focus-trap";

const attributes = {
  ariaExpanded: "aria-expanded",
  tabIndex: "tabindex",
};

const icons = {
  open: "fa-bars",
  close: "fa-times",
};

const ids = {
  siteNav: "bc_site-nav",
  siteNavToggleButton: "bc_site-nav__toggle-button",
  page: "bc_page",
};

const cssClasses = {
  hidden: "invisible",
  hiddenInit: "hidden-init",
  isActive: "is-active",
  isDisabled: "is-disabled",
  siteNavToggleButtonText: "bc_site-nav__toggle-button__text",
  siteNavListContainer: "bc_site-nav__list-container",
};

const invisibleTabIndex = "-1"; /** Allows us to hide an item from tabbing */
let siteNavFocusTrap;

/**
 * * Hide/Show the site navigation based on the given shouldShow param
 * @param {boolean} shouldShow if set to true the site navigation will be shown
 */
const toggleSiteNav = (shouldShow) => {
  const classListAction = shouldShow ? "add" : "remove";
  const siteNavToggleButtonElm = document.getElementById(
    ids.siteNavToggleButton
  );
  const buttonIconElm = GetFirstElementOrDefault(siteNavToggleButtonElm, "i");
  const buttonIconTextElm = GetFirstElementOrDefault(
    siteNavToggleButtonElm,
    `.${cssClasses.siteNavToggleButtonText}`
  );
  const siteNavContainerElm = GetFirstElementOrDefault(
    document.getElementById(ids.siteNav),
    `.${cssClasses.siteNavListContainer}`
  );
  const pageElm = document.getElementById(ids.page);

  // Update toggle button text
  buttonIconTextElm.textContent = shouldShow ? "Close" : "Menu";

  // Toggle the content hidden class
  siteNavContainerElm.classList[shouldShow ? "remove" : "add"](
    cssClasses.hidden
  );

  // Toggle the toggle button icon
  buttonIconElm.classList.remove(shouldShow ? icons.open : icons.close);
  buttonIconElm.classList.add(shouldShow ? icons.close : icons.open);

  // Set / Remove aria-expanded attributes
  SetAttributeForElms(
    [siteNavToggleButtonElm, pageElm],
    attributes.ariaExpanded,
    shouldShow
  );

  // Set / Remove tab-index inside Site Nav
  updateSiteNavTabIndex(shouldShow);

  // Activate or deactivate proper focus state
  siteNavFocusTrap[shouldShow ? "activate" : "deactivate"]();

  // Add / Remove esc listener
  document[shouldShow ? "addEventListener" : "removeEventListener"](
    "keydown",
    handleDocumentKeyDown,
    true
  );

  // Hide / Show the site nav
  document
    .getElementById(ids.siteNav)
    .classList[classListAction](cssClasses.isActive);

  // Enable / Disabled page and body
  const disabledElms = [pageElm, document.body];
  if (shouldShow) {
    AddClassToElms(disabledElms, cssClasses.isDisabled);
  } else {
    RemoveClassFromElms(disabledElms, cssClasses.isDisabled);
  }
};

/**
 * Handle any click on the document. An if else block will handle any specific
 * click events we want to capture.
 * @param {document:click} clickEvent - the observable click event
 * @listens document:click
 */
const handleDocumentClick = (clickEvent) => {
  const { target } = clickEvent;
  const isSiteNavButtonClick =
    target.id === ids.siteNavToggleButton ||
    target.closest(`#${ids.siteNavToggleButton}`);
  const pageElm = target.closest(`#${ids.page}`);
  const isDisabledPageClick =
    pageElm && pageElm.classList.contains(cssClasses.isDisabled);

  if (isSiteNavButtonClick) {
    handleSiteNavigationButtonClick(clickEvent);
  } else if (isDisabledPageClick) {
    // Close the site nav
    toggleSiteNav(false);
  }

  return;
};

/**
 * Handle any keydown on the document. An switch statement will handle any specific
 * click events we want to capture.
 * @param {document:keydown} keyDownEvent - the observable keydown event
 * @listens document:keydown
 */
const handleDocumentKeyDown = (event) => {
  const { key, keyCode } = event;

  /** Ensure ESC key collapses the menu in all browsers */
  if (key === "Escape" || keyCode === 27) {
    toggleSiteNav(false);
  } else {
    return;
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
};

/**
 * Handle the site navigation button click. Works as a toggle button to show / hide site navigation.
 * @param {button:click} clickEvent - the observable click event
 * @listens button:click
 */
const handleSiteNavigationButtonClick = (clickEvent) => {
  const { target } = clickEvent;
  const siteNavToggleButton =
    target.id === ids.siteNavToggleButton
      ? target
      : target.closest(`#${ids.siteNavToggleButton}`);
  const buttonAriaExpandedValue = siteNavToggleButton.getAttribute(
    attributes.ariaExpanded
  );

  /** If no aria attribute exists this means the menu is closed and we want to show it. */
  const shouldShowNav =
    !buttonAriaExpandedValue ||
    !(buttonAriaExpandedValue.toLowerCase() === "true");

  toggleSiteNav(shouldShowNav);
};

/**
 * Do stuff after the dom has loaded
 */
const onDocumentReady = () => {
  // Allows users to use the menu even if javascript is not enabled
  var siteNavToggleButton = document.getElementById(ids.siteNavToggleButton);

  if (siteNavToggleButton) {
    siteNavToggleButton.classList.remove(cssClasses.hiddenInit); //TODO: do we still need this?
  }

  const siteNav = document.getElementById(ids.siteNav);

  if (siteNav) {
    GetFirstElementOrDefault(
      siteNav,
      `.${cssClasses.siteNavListContainer}`
    ).classList.add(cssClasses.hidden);

    SetAttributeForElms(
      siteNav.querySelectorAll("a"),
      attributes.tabIndex,
      invisibleTabIndex
    );
  }

  /**
   * Initialize a focus trap for use when the site navigation is active / visible
   * See http://davidtheclark.github.io/focus-trap/ for more details.
   */

  siteNavFocusTrap = FocusTrap(document.getElementById(ids.siteNav), {
    clickOutsideDeactivates: true,
  });
};

/**
 * Remove site nav items from the tab index if the site nav is hidden
 * @param {boolean} shouldShow flag that denotes if the site nav should be shown
 */
const updateSiteNavTabIndex = (shouldShow) => {
  const siteNavLinkElms = document
    .getElementById(ids.siteNav)
    .querySelectorAll("a");
  siteNavLinkElms.forEach((siteNavLinkElm) => {
    if (shouldShow) {
      siteNavLinkElm.removeAttribute(attributes.tabIndex);
    } else {
      siteNavLinkElm.setAttribute(attributes.tabIndex, invisibleTabIndex);
    }
  });
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);

/**
 * Ensure we capture all events
 * https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
 */
document.addEventListener("click", handleDocumentClick, false);
