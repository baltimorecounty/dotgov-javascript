import "../polyfills/includes.polyfill";
import "../polyfills/closest.polyfill";
import "../polyfills/nodelist-foreach.polyfill";

import { HtmlAttributes } from "../utilities/constants.utilities";

const cssClasses = {
  accordionButton: "dg_accordion-btn",
  collapseComponent: "dg_collapse",
};

const menuOpen = "collapse show";
const buttonOpenAll = "Open All";
const buttonCloseAll = "Close All";

document.addEventListener(
  "click",
  (onDocumentClick) => {
    const { target } = onDocumentClick;
    const targetClassList = target.classList;
    const isAccordionButtonClick =
      targetClassList.contains(cssClasses.accordionButton) ||
      targetClassList.contains("dg_accordion_buttontext-holder");

    if (targetClassList.contains("dg_allitems")) {
      allMenuItemsAction(target);
    } else if (isAccordionButtonClick) {
      toggleAccordionPanel(target);
    } else {
      return;
    }
  },
  false
);

const onMediumWindowSizeChangeCollapse = (onDocumentResize) => {
  const isAccordionCollapse = document.getElementsByClassName(
    "dg_collapse dg_accordion__collapsible"
  );
  if (isAccordionCollapse) {
    if (window.outerWidth < 769) {
      for (let i = 0; i < isAccordionCollapse.length; i++) {
        isAccordionCollapse[i].classList.add("collapsed");

        var collapseButton = isAccordionCollapse[i].getElementsByClassName(
          "multi-collapse collapse show"
        );
        collapseButton[0] ? collapseButton[0].classList.remove("show") : null;
      }
    }
  }
};

window.addEventListener("resize", (onDocumentResize) => {
  onMediumWindowSizeChangeCollapse();
});

window.addEventListener("DOMContentLoaded", (onDocumentResize) => {
  onMediumWindowSizeChangeCollapse();
});

/**
 * Handler for all document focus events
 * @param {*} focusEvent
 */
const onDocumentFocus = (focusEvent) => {
  const { target } = focusEvent;
  const isAccordionButtonElm = target.classList.contains(
    cssClasses.accordionButton
  );

  if (isAccordionButtonElm) {
    toggleAccordionFocus(focusEvent);
  }
};

/**
 * Do stuff after the dom has loaded
 */
const onDocumentReady = () => {
  const expandedAccordionToggleButtonElms = document.querySelectorAll(
    `:not(#root) .${cssClasses.accordionButton}[aria-expanded="true"]`
  );

  const nonReactAccordionElms = [...expandedAccordionToggleButtonElms].filter(
    (x) => !x.closest("#root")
  );

  nonReactAccordionElms.forEach((toggleButtonElm) => {
    toggleAccordionPanel(toggleButtonElm, true);
  });
};

var ua = window.navigator.userAgent;
var isIE = /MSIE|Trident|Edge\//.test(ua);
if (isIE) {
  document.addEventListener("focusin", onDocumentFocus, false);
  document.addEventListener("focusout", onDocumentFocus, false);
}

/**
 * Toggles class that enables proper focus
 * This is a workaround for the IE and Edge Browsers that do not support :focus-within
 * @param {*} focusEvent
 */
const toggleAccordionFocus = (focusEvent) => {
  const { target, type: focusType } = focusEvent;
  var accordionHeaderElms = target.getElementsByClassName(
    "dg_accordion_buttontext-holder"
  );

  if (focusType === "focusin") {
    accordionHeaderElms[0].classList.add("ms-focus-within");
  }

  if (focusType === "focusout") {
    accordionHeaderElms[0].classList.remove("ms-focus-within");
  }
};

const selectElementByClassName = (element, cssNameText) => {
  var sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.matches(cssNameText)) {
      return sibling;
    } else {
      sibling = sibling.nextElementSibling;
    }
  }
};

/**
 * Toggles an accordion panel for a given element.
 * This toggles handle hiding / showing the content as well as handling any
 * accessability and visual stuff that needs to happen to the corresponding accordion elements.
 * @param {HTMLElement} accordionHeaderElm
 */
const toggleAccordionPanel = (accordionHeaderElm, shouldForceOpen) => {
  var mainDivElm =
    accordionHeaderElm.closest(".dg_accordion") ||
    accordionHeaderElm.closest(`.${cssClasses.collapseComponent}`);
  var menuItems = mainDivElm.getElementsByClassName("multi-collapse");
  var totalCollapsedPanels = mainDivElm.getElementsByClassName("show");
  var accordionButtonElm = accordionHeaderElm.closest("button");
  var accordionContentElm = selectElementByClassName(
    accordionButtonElm,
    ".multi-collapse"
  );
  var accordionButtonAllElms = mainDivElm.getElementsByClassName("dg_allitems");
  var isAccordionExpanded = accordionContentElm.className.includes(menuOpen);
  var shouldOpenPanel = shouldForceOpen || !isAccordionExpanded;

  // Toggle the accordion's button aria-expanded attribute
  accordionButtonElm.setAttribute(HtmlAttributes.ariaExpanded, shouldOpenPanel);

  //If its open then we want to close it and vice versa
  collapsePanelUpdate(shouldOpenPanel, accordionContentElm);

  accordionButtonAllElms.length > 0
    ? updateButtonStatus(
        accordionButtonAllElms[0],
        menuItems.length,
        totalCollapsedPanels.length
      )
    : null;
};

const allMenuItemsAction = (button) => {
  const isMenuOpen =
    button.textContent.toLowerCase().trim() === "open all" ? true : false;

  var bodyElm = button.closest(".dg_accordion");
  var menuItems = bodyElm.getElementsByClassName("multi-collapse");
  var totalCollapsedPanels = bodyElm.getElementsByClassName("show");

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    collapsePanelUpdate(isMenuOpen, menuItem);
  }
  updateButtonStatus(button, menuItems.length, totalCollapsedPanels.length);
};

/**
 * Expands or collapse a content panel for a given accordion panel content element
 * @param {boolean} shouldOpenPanel flag to determine if the accordion content should be expand or collapse
 * @param {HTMLElement} accordionPanelContentElm accordion panel to expand / collapse
 */
const collapsePanelUpdate = (shouldOpenPanel, accordionPanelContentElm) => {
  accordionPanelContentElm.className = menuState(
    shouldOpenPanel ? "open" : "close"
  );
  accordionPanelContentElm.setAttribute(
    HtmlAttributes.ariaExpanded,
    shouldOpenPanel
  );
  var accordionElm = accordionPanelContentElm.closest(
    ".dg_accordion__collapsible"
  );

  accordionElm.classList[shouldOpenPanel ? "remove" : "add"]("collapsed");
};

const menuState = (state) =>
  `multi-collapse collapse ${
    state.toLowerCase() === "open" ? "show" : ""
  }`.trim();

const updateButtonStatus = (
  button,
  totalCollapsiblePanels,
  totalCollapsedPanels
) => {
  totalCollapsiblePanels === totalCollapsedPanels
    ? (button.textContent = buttonCloseAll)
    : (button.textContent = buttonOpenAll);
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);
