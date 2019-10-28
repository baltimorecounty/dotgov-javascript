import {
  GetFirstElementOrDefault,
  SetAttribute
} from "../utilities/dom.utilities";
import FocusTrap from "focus-trap";

const attributes = {
  ariaExpanded: "aria-expanded",
  tabIndex: "tabindex"
};

const icons = {
  open: "fa-bars",
  close: "fa-times"
};

const ids = {
  siteNav: "bc_site-nav",
  siteNavToggleButton: "bc_site-nav__toggle-button",
  siteNavLinks: "bc_site-nav__links",
  page: "bc_page"
};

const cssClasses = {
  hidden: "hidden",
  hiddenInit: "hidden-init",
  isActive: "is-active",
  isDisabled: "is-disabled",
  siteNavToggleButtonText: "bc_site-nav__toggle-button__text"
};

const invisibleTabIndex = "-1"; /** Allows us to hide an item from tabbing */
let siteNavFocusTrap;

/**
 * * Hide/Show the site navigation based on the given shouldShow param
 * @param {boolean} shouldShow if set to true the site navigation will be shown
 */
const toggleSiteNav = shouldShow => {
  const classListAction = shouldShow ? "add" : "remove";
  const siteNavToggleButtonElm = document.getElementById(
    ids.siteNavToggleButton
  );
  const buttonIconElm = GetFirstElementOrDefault(siteNavToggleButtonElm, "i");
  const buttonIconTextElm = GetFirstElementOrDefault(
    siteNavToggleButtonElm,
    `.${cssClasses.siteNavToggleButtonText}`
  );
  const pageElm = document.getElementById(ids.page);

  // Update toggle button text
  buttonIconTextElm.textContent = shouldShow ? "Close" : "Menu";

  // Toggle the toggle button icon
  buttonIconElm.classList.remove(shouldShow ? icons.open : icons.close);
  buttonIconElm.classList.add(shouldShow ? icons.close : icons.open);

  // Set / Remove aria-expanded attributes
  SetAttribute(
    [siteNavToggleButtonElm, pageElm],
    attributes.ariaExpanded,
    shouldShow
  );

  // Set / Remove tab-index inside Site Nav
  updateSiteNavTabIndex(shouldShow);

  // Hide / Show the site nav
  document
    .getElementById(ids.siteNav)
    .classList[classListAction](cssClasses.isActive);

  // Activate or deactivate proper focus state
  siteNavFocusTrap[shouldShow ? "activate" : "deactivate"]();

  // Add / Remove esc listener
  document[shouldShow ? "addEventListener" : "removeEventListener"](
    "keydown",
    handleDocumentKeyDown,
    true
  );

  // Enable / Disabled page and body
  pageElm.classList[classListAction](cssClasses.isDisabled);
  document.body.classList[classListAction](cssClasses.isDisabled);
};

/**
 * Handle any click on the document. An if else block will handle any specific
 * click events we want to capture.
 * @param {document:click} clickEvent - the observable click event
 * @listens document:click
 */
const handleDocumentClick = clickEvent => {
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
const handleDocumentKeyDown = keyDownEvent => {
  switch (event.key) {
    case "Escape":
      // Close the site nav
      toggleSiteNav(false);
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
};

/**
 * Handle the site navigation button click. Works as a toggle button to show / hide site navigation.
 * @param {button:click} clickEvent - the observable click event
 * @listens button:click
 */
const handleSiteNavigationButtonClick = clickEvent => {
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
  document
    .getElementById(ids.siteNavToggleButton)
    .classList.remove(cssClasses.hiddenInit); //TODO: do we still need this?

  const siteNav = document.getElementById(ids.siteNav);

  document.getElementById(ids.siteNavLinks).classList.add(cssClasses.hidden);

  SetAttribute(
    siteNav.querySelectorAll("a"),
    attributes.tabIndex,
    invisibleTabIndex
  );

  /**
   * Initialize a focus trap for use when the site navigation is active / visible
   * See http://davidtheclark.github.io/focus-trap/ for more details.
   */

  siteNavFocusTrap = FocusTrap(document.getElementById(ids.siteNav), {
    clickOutsideDeactivates: true
  });
};

/**
 * Remove site nav items from the tab index if the site nav is hidden
 * @param {boolean} shouldShow flag that denotes if the site nav should be shown
 */
const updateSiteNavTabIndex = shouldShow => {
  const siteNavLinkElms = document
    .getElementById(ids.siteNav)
    .querySelectorAll("a");
  siteNavLinkElms.forEach(siteNavLinkElm => {
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
