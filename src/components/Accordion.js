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
    } else if (target.className.includes("dg_accordian-btn")) {
      menuAction(target);
    } else {
      return;
    }
  },
  false
);

const selectElementByClassName = (element, cssName) => {
  var sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.matches(cssName)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

const menuAction = element => {
  var mainDiv = element.closest(".dg_accordion");
  var menuItems = mainDiv.getElementsByClassName("multi-collapse");
  var totalCollapsed = mainDiv.getElementsByClassName("show");
  var childDiv = selectElementByClassName(element, ".multi-collapse");
  var menuID = childDiv.id;

  var button = mainDiv.getElementsByClassName("dg_allitems");

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    var isMenuOpen = menuItem.className.includes(menuOpen);

    if (menuID !== menuItems[i].id) {
      menuItem.className = mainDiv.className.includes(
        "dg_allowmultipleopen" //This class determines if an accordion will allow multiple panels opened
      )
        ? menuItem.className
        : menuState("close");
    } else {
      //If its open then we want to close it and vice versa
      collpasePanelUpdate(!isMenuOpen, menuItem);

      button
        ? updateButtonStatus(button[0], menuItems.length, totalCollapsed.length)
        : null;
    }
  }
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
  menuItem.setAttribute("aria-expanded", !isMenuOpen);
  menuItem.closest(
    ".dg_accordian__collpasible"
  ).className = `dg_accordian__collpasible ${
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
