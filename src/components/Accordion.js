import "../polyfills/includes.polyfill";

const menuOpen = "collapse show";
const buttonOpenAll = "Open All";
const buttonCloseAll = "Close All";

document.addEventListener(
  "click",
  clickEvent => {
    const { target } = clickEvent;

    if (target && target.className === "dg_allitems") {
      AllMenuItemsAction(target);
    } else if (target) {
      MenuAction(target);
    } else {
      return;
    }
  },
  false
);

function MenuAction(element) {
  var mainDiv = element.parentElement.parentElement;
  var menuItems = mainDiv.getElementsByClassName("multi-collapse");
  var childDiv = element.nextElementSibling;
  var menuID = childDiv.id;

  for (let i = 0; i < menuItems.length; i++) {
    if (menuID !== menuItems[i].id) {
      menuItems[i].className = mainDiv.className.includes(
        "dg_allowmutlipleopen"
      )
        ? menuItems[i].className
        : menuState("close");
    } else {
      if (menuItems[i].className.includes(menuOpen)) {
        menuItems[i].className = menuState("close");
        menuItems[i].setAttribute("aria-expanded", false);
        element.parentElement.className = "card fa collapsed dg_menuitem";
      } else {
        menuItems[i].className = menuState("open");
        menuItems[i].setAttribute("aria-expanded", true);
        element.parentElement.className = "card fa dg_menuitem";
      }
    }
  }
}

function AllMenuItemsAction(button) {
  var status = button.innerHTML.trim();
  var body = button.parentElement;
  var menuItems = body.getElementsByClassName("multi-collapse");

  if (button.innerHTML.trim() === buttonOpenAll) {
    button.innerHTML = buttonCloseAll;
  } else {
    button.innerHTML = buttonOpenAll;
  }

  for (let i = 0; i < menuItems.length; i++) {
    if (status == "Open All") {
      menuItems[i].className = menuState("open");
      menuItems[i].setAttribute("aria-expanded", true);
      menuItems[i].parentElement.className = "card fa dg_menuitem";
    } else {
      menuItems[i].className = menuState("close");
      menuItems[i].setAttribute("aria-expanded", false);
      menuItems[i].parentElement.className = "card fa collapsed dg_menuitem";
    }
  }
}

function menuState(state) {
  if (state === "open") {
    return "multi-collapse collapse show";
  } else {
    return "multi-collapse collapse";
  }
}
