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
  var accordionHeaderTextElms = target.getElementsByClassName(
    "dg_accordion_buttontext-holder"
  );

  if (focusType === "focusin") {
    accordionHeaderTextElms[0].classList.add("ms-focus-within");
  }

  if (focusType === "focusout") {
    accordionHeaderTextElms[0].classList.remove("ms-focus-within");
  }
};

const selectElementByClassName = (element, cssName) => {
  var sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.matches(cssName)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

const menuAction = accordionHeaderElm => {
  var mainDiv = accordionHeaderElm.closest(".dg_accordion");
  var menuItems = mainDiv.getElementsByClassName("multi-collapse");
  var totalCollapsed = mainDiv.getElementsByClassName("show");
  var accordionButton = accordionHeaderElm.closest("button");
  var accordionContent = selectElementByClassName(
    accordionButton,
    ".multi-collapse"
  );
  var accordionButtonAll = mainDiv.getElementsByClassName("dg_allitems");
  var isMenuOpen = accordionContent.className.includes(menuOpen);

  //If its open then we want to close it and vice versa
  collpasePanelUpdate(!isMenuOpen, accordionContent);

  accordionButtonAll
    ? updateButtonStatus(
        accordionButtonAll[0],
        menuItems.length,
        totalCollapsed.length
      )
    : null;
};

const allMenuItemsAction = button => {
  const isMenuOpen =
    button.textContent.toLowerCase().trim() === "open all" ? true : false;

  var body = button.closest(".dg_accordion");
  var menuItems = body.getElementsByClassName("multi-collapse");
  var totalCollapsed = body.getElementsByClassName("show");

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    collpasePanelUpdate(isMenuOpen, menuItem);
  }
  updateButtonStatus(button, menuItems.length, totalCollapsed.length);
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

const updateButtonStatus = (button, totalCollapsibles, totalCollapsed) => {
  totalCollapsibles === totalCollapsed
    ? (button.textContent = buttonCloseAll)
    : (button.textContent = buttonOpenAll);
};
