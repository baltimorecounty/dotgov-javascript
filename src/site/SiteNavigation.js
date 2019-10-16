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
  disabled: "disabled",
  hidden: "hidden",
  hiddenInit: "hidden-init"
};

const handleDocumentClick = clickEvent => {
  const { target } = clickEvent;
  const isSiteNavButtonClick =
    target.id === ids.siteNavBtn || target.closest(`${ids.siteNavBtn}`);

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

/**
 *
 */
const onDocumentReady = () => {
  // Allows users to use the menu even if javascript is not enabled
  document
    .getElementById(ids.siteNavBtn)
    .classList.remove(cssClasses.hiddenInit);

  const siteNav = document.getElementById(ids.siteNavLinks);

  siteNav.classList.add(cssClasses.hidden);
  SetAttribute(siteNav.querySelectorAll("a"), "tabindex", "-1");
};

/**
 *
 * @param {*} navButtonElm
 */
const toggleNavigationButton = navButtonElm => {
  const willCollapse = !!navButtonElm.getAttribute("aria-expanded");
  const siteNavLinksElm = document.getElementById(`${ids.siteNavLinks}`);
  const body = document.getElementsByTagName("body")[0];
  const page = document.getElementById("bc_page");

  siteNavLinksElm.classList[willCollapse ? "remove" : "add"](cssClasses.hidden);

  // tabindex is set to -1 when the menu is not visible
  // so the user can navigate what is visible on the screen.
  SetAttribute(
    siteNavLinksElm.querySelectorAll("a"),
    "tabindex",
    willCollapse ? "" : "-1"
  );

  body.classList.toggle(cssClasses.disabled);
  page.classList.toggle(cssClasses.disabled);

  navButtonElm.setAttribute("aria-expanded", !willCollapse);
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);

/**
 * Ensure we capture all events
 * https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
 */
document.addEventListener("click", handleDocumentClick, false);
