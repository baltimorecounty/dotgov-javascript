import "../polyfills/includes.polyfill";
import "../polyfills/closest.polyfill";

const menuOpen = "collapse show";
const buttonOpenAll = "Open All";
const buttonCloseAll = "Close All";

document.addEventListener(
  "click",
  onDocumentClick => {
    const { target } = onDocumentClick;

    if (target.className.includes("dg_allitems")) {
      allMenuItemsAction(target);
    } else if (
      target.className.includes("dg_accordion-btn") ||
      target.className.includes("dg_accordion_buttontext-holder")
    ) {
      menuAction(target);
    } else {
      return;
    }
  },
  false
);

/**
 * Handler for all document focus events
 * @param {*} focusEvent
 */
const onDocumentFocus = focusEvent => {
  const { target } = focusEvent;
  const isAccordionButtonElm = target.classList.contains("dg_accordion-btn");

  if (isAccordionButtonElm) {
    toggleAccordionFocus(focusEvent);
  }
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
const toggleAccordionFocus = focusEvent => {
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

const menuAction = accordionHeaderElm => {
  var mainDivElm = accordionHeaderElm.closest(".dg_accordion");
  var menuItems = mainDivElm.getElementsByClassName("multi-collapse");
  var totalCollapsedPanels = mainDivElm.getElementsByClassName("show");
  var accordionButtonElm = accordionHeaderElm.closest("button");
  var accordionContentElm = selectElementByClassName(
    accordionButtonElm,
    ".multi-collapse"
  );
  var accordionButtonAllElms = mainDivElm.getElementsByClassName("dg_allitems");
  var isMenuOpen = accordionContentElm.className.includes(menuOpen);

  //If its open then we want to close it and vice versa
  collpasePanelUpdate(!isMenuOpen, accordionContentElm);

  accordionButtonAllElms
    ? updateButtonStatus(
        accordionButtonAllElms[0],
        menuItems.length,
        totalCollapsedPanels.length
      )
    : null;
};

const allMenuItemsAction = button => {
  const isMenuOpen =
    button.textContent.toLowerCase().trim() === "open all" ? true : false;

  var bodyElm = button.closest(".dg_accordion");
  var menuItems = bodyElm.getElementsByClassName("multi-collapse");
  var totalCollapsedPanels = bodyElm.getElementsByClassName("show");

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    collpasePanelUpdate(isMenuOpen, menuItem);
  }
  updateButtonStatus(button, menuItems.length, totalCollapsedPanels.length);
};

const collpasePanelUpdate = (isMenuOpen, menuItem) => {
  menuItem.className = menuState(isMenuOpen ? "open" : "close");
  menuItem.setAttribute("aria-expanded", isMenuOpen);
  var element = menuItem.closest(".dg_accordion__collapsible");

  element.className = `dg_accordion__collapsible ${
    isMenuOpen ? "" : "collapsed"
  }`.trim();
};

const menuState = state =>
  `multi-collapse collapse ${
    state.toLowerCase() === "open" ? "show" : ""
  }`.trim();

const updateButtonStatus = (
  button,
  totalCollapsiblesPanels,
  totalCollapsedPanels
) => {
  totalCollapsiblesPanels === totalCollapsedPanels
    ? (button.textContent = buttonCloseAll)
    : (button.textContent = buttonOpenAll);
};
