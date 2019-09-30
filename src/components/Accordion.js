import "../polyfills/includes.polyfill";

const menuOpen = "collapse show";
const buttonOpenAll = "Open All";
const buttonCloseAll = "Close All";

document.addEventListener(
  "click",
  onDocumentClick => {
    const { target } = onDocumentClick;

    if (target && target.className === "dg_allitems") {
      allMenuItemsAction(target);
    } else if (target) {
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

    if (menuID !== menuItems[i].id) {
      menuItem.className = mainDiv.className.includes("dg_allowmutlipleopen")
        ? menuItem.className
        : menuState("close");
    } else {
      menuItem.className.includes(menuOpen)
        ? ((menuItem.className = menuState("close")),
          menuItem.setAttribute("aria-expanded", false),
          (menuItem.closest(".dg_menuitem").className =
            "collapsed dg_menuitem"))
        : ((menuItem.className = menuState("open")),
          menuItem.setAttribute("aria-expanded", true),
          (menuItem.closest(".collapsed").className = "dg_menuitem"));
    }
  }
};

const allMenuItemsAction = button => {
  var status = button.textContent.trim();
  var body = button.closest(".dg_accordion");
  var menuItems = body.getElementsByClassName("multi-collapse");

  button.textContent.trim() === buttonOpenAll
    ? (button.textContent = buttonCloseAll)
    : (button.textContent = buttonOpenAll);

  for (let i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    status.toLowerCase() === "open all"
      ? ((menuItem.className = menuState("open")),
        menuItem.setAttribute("aria-expanded", true),
        (menuItem.closest(".collapsed").className = "dg_menuitem"))
      : ((menuItem.className = menuState("close")),
        menuItem.setAttribute("aria-expanded", false),
        (menuItem.closest(".dg_menuitem").className = "collapsed dg_menuitem"));
  }
};

const menuState = state => {
  return state.toLowerCase() === "open"
    ? "multi-collapse collapse show"
    : "multi-collapse collapse";
};
