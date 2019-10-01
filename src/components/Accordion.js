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

const menuAction = element => {
  var mainDiv = element.closest(".dg_accordion");
  var menuItems = mainDiv.getElementsByClassName("multi-collapse");
  var childDiv = element.nextElementSibling;
  var menuID = childDiv.id;

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    var isMenuOpen = menuItem.className.includes(menuOpen);

    if (menuID !== menuItems[i].id) {
      menuItem.className = mainDiv.className.includes(
        "dg_allowmutlipleopen" //This class determines if an accordion will allow multiple panels opened
      )
        ? menuItem.className
        : menuState("close");
    } else {
      //If its open then we want to close it and vice versa
      collpasePanelUpdate(!isMenuOpen, menuItem);
    }
  }
};

const allMenuItemsAction = button => {
  const isMenuOpen =
    button.textContent.toLowerCase().trim() === "open all" ? true : false;

  var body = button.closest(".dg_accordion");
  var menuItems = body.getElementsByClassName("multi-collapse");

  button.textContent.trim() === buttonOpenAll
    ? (button.textContent = buttonCloseAll)
    : (button.textContent = buttonOpenAll);

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    collpasePanelUpdate(isMenuOpen, menuItem);
  }
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
