import {
  AddClassToElms,
  RemoveClassFromElms,
  GetFirstElementOrDefault,
  SetAttributeForElms,
} from "./../../utilities/dom.utilities";

const ids = {
  loopNavToggleButton: "loop-button-menu",
};

const cssClasses = {
  isActive: "active",
};

const icons = {
  open: "fa-bars",
  close: "fa-times",
};

const attributes = {
  ariaExpanded: "aria-expanded",
  tabIndex: "tabindex",
};

const toggleSiteNav = (shouldShow) => {
  const siteNavToggleButtonElm = document.getElementById(
    ids.loopNavToggleButton
  );
  const buttonIconElm = GetFirstElementOrDefault(siteNavToggleButtonElm, "i");
  // Toggle the toggle button icon
  buttonIconElm.classList.remove(shouldShow ? icons.open : icons.close);
  buttonIconElm.classList.add(shouldShow ? icons.close : icons.open);

  SetAttributeForElms(
    [siteNavToggleButtonElm],
    attributes.ariaExpanded,
    shouldShow
  );

  // Add / Remove esc listener
  document[shouldShow ? "addEventListener" : "removeEventListener"](
    "keydown",
    handleDocumentKeyDown,
    true
  );

  const disabledElms = [document.body];
  if (shouldShow) {
    AddClassToElms(disabledElms, cssClasses.isActive);
  } else {
    RemoveClassFromElms(disabledElms, cssClasses.isActive);
  }
};

const handleDocumentClick = (clickEvent) => {
  const { target } = clickEvent;

  const isLoopNavButtonClick =
    target.id === ids.loopNavToggleButton ||
    target.closest(`#${ids.loopNavToggleButton}`);

  if (isLoopNavButtonClick) {
    handleSiteNavigationButtonClick(clickEvent);
  } else {
    // Close the site nav
    toggleSiteNav(false);
  }

  return;
};
const handleSiteNavigationButtonClick = (clickEvent) => {
  const { target } = clickEvent;
  const siteNavToggleButton =
    target.id === ids.loopNavToggleButton
      ? target
      : target.closest(`#${ids.loopNavToggleButton}`);

  const buttonAriaExpandedValue = siteNavToggleButton.getAttribute(
    attributes.ariaExpanded
  );
  /** If no aria attribute exists this means the menu is closed and we want to show it. */
  const shouldShowNav =
    !buttonAriaExpandedValue ||
    !(buttonAriaExpandedValue.toLowerCase() === "true");

  toggleSiteNav(shouldShowNav);
};

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

document.addEventListener("click", handleDocumentClick, false);

window.addEventListener("resize", () => {
  const disabledElms = [document.body];
  RemoveClassFromElms(disabledElms, cssClasses.isActive);

  toggleSiteNav(false);
});
