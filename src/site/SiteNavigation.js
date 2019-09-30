import {
  AddClass,
  RemoveClass,
  ToggleClass,
  SetAttribute
} from "../utilities/dom.utilities";
const ids = {
  siteHeader: "bc_site-header",
  siteNavBtn: "bc_site-nav__toggle-btn",
  siteNavLinks: "bc_site-nav__links",
  page: "bc_page"
};

const cssClasses = {
  active: "active",
  hidden: "hidden"
};

const handleDocumentClick = clickEvent => {
  const { target } = clickEvent;
  const isSiteNavButtonClick = target.id === ids.siteNavBtn;

  if (isSiteNavButtonClick) {
    handleSiteNavigationButtonClick(clickEvent);
  }
  return;
};

const handleSiteNavigationButtonClick = clickEvent => {
  const { target } = clickEvent;
  const elmsToToggle = document.querySelectorAll(
    `#${ids.siteHeader}, #${ids.page}`
  );

  // Position the page and header based on the menu state
  ToggleClass(elmsToToggle, cssClasses.active);

  toggleNavigationButton(target);
};

const toggleNavigationButton = navButtonElm => {
  const willCollapse = !!btn.getAttribute("aria-expanded");
  const siteNavLinkElms = document.querySelectorAll(`#${ids.siteNavLinks} a`);

  if (willCollapse) {
    AddClass(siteNavLinkElms, cssClasses.hidden);
  } else {
    RemoveClass(siteNavLinkElms, cssClasses.hidden);
  }

  // tabindex is set to -1 when the menu is not visible
  // so the user can navigate what is visible on the screen.
  SetAttribute(siteNavLinkElms, "tabindex", willCollapse ? "-1" : "");
  navButtonElm.setAttribute("aria-expanded", !isExpanded);
};

const init = (options = {}) => {
  /**
   * Ensure we capture all events
   * https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
   */
  document.addEventListener("click", handleDocumentClick, false);
};

// TODO: Add document.ready
