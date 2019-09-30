import "../polyfills/includes.polyfill";

const menuOpen = "collapse show";
const buttonOpenAll = "Open All";
const buttonCloseAll = "Close All";

const onDocumentClick = document.addEventListener(
  "click",
  clickEvent => {
    const { target } = clickEvent;

    if (target && target.className === "dg_allitems") {
      AllMenuItemsAction(target);
    } else if (target) {
      menuAction(target);
    } else {
      return;
    }
  },
  false
);

const menuAction = element => {
  var mainDiv = element.parentElement.parentElement;
  var menuItems = mainDiv.getElementsByClassName("multi-collapse");
  var childDiv = element.nextElementSibling;
  var menuID = childDiv.id;

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    if (menuID !== menuItems[i].id) {
      menuItem.className = mainDiv.className.includes("dg_allowmutlipleopen")
        ? menuItem.className
        : menuState("close");
    } else {
      if (menuItem.className.includes(menuOpen)) {
        menuItem.className = menuState("close");
        menuItem.setAttribute("aria-expanded", false);
        element.parentElement.className = "collapsed dg_menuitem";
      } else {
        menuItem.className = menuState("open");
        menuItem.setAttribute("aria-expanded", true);
        element.parentElement.className = "dg_menuitem";
      }
    }
  }
};

const AllMenuItemsAction = button => {
  var status = button.innerHTML.trim();
  var body = button.parentElement;
  var menuItems = body.getElementsByClassName("multi-collapse");

  if (button.innerHTML.trim() === buttonOpenAll) {
    button.innerHTML = buttonCloseAll;
  } else {
    button.innerHTML = buttonOpenAll;
  }

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    if (status == "Open All") {
      menuItem.className = menuState("open");
      menuItem.setAttribute("aria-expanded", true);
      menuItem.parentElement.className = "dg_menuitem";
    } else {
      menuItem.className = menuState("close");
      menuItem.setAttribute("aria-expanded", false);
      menuItem.parentElement.className = "collapsed dg_menuitem";
    }
  }
};

function menuState(state) {
  if (state === "open") {
    return "multi-collapse collapse show";
  } else {
    return "multi-collapse collapse";
  }
}
