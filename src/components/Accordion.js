const menuOpen = "dg_menuopened";
const menuClose = "dg_menuclosed";
const buttonOpenAll = "Open All";
const buttonCloseAll = "Close All";

function MenuAction(button) {
  var body = button.parentElement;
  var menuItems = body.getElementsByClassName("dg_accordion");
  var panel = button.nextElementSibling;
  var menuID = panel.id;

  for (i = 0; i < menuItems.length; i++) {
    var menuPanel = menuItems[i].nextElementSibling;
    if (menuID !== menuPanel.id) {
      menuPanel.className =
        body.className === "dg_toggleall" ? menuPanel.className : menuClose;
    } else {
      if (panel.className.includes(menuOpen)) {
        panel.className = menuState(panel, "close");
        menuItems[i].className = "dg_accordion";
      } else {
        panel.className = menuState(panel, "open");
        menuItems[i].className = "dg_accordion-down";
      }
    }
  }
}

function AllMenuItemsAction(button) {
  var status = button.innerHTML.trim();
  var body = button.parentElement;
  var menuItems = body.getElementsByClassName("dg_accordion");

  if (button.innerHTML.trim() === buttonOpenAll) {
    button.innerHTML = buttonCloseAll;
  } else {
    button.innerHTML = buttonOpenAll;
  }

  for (i = 0; i < menuItems.length; i++) {
    var panel = menuItems[i].nextElementSibling;

    if (status == "Open All") {
      panel.className = menuState(panel, "open");
      menuItems[i].className = "dg_accordion-down";
    } else {
      panel.className = menuState(panel, "close");
      menuItems[i].className = "dg_accordion";
    }
  }
}

function menuState(panel, state) {
  if (state === "open") {
    return (panel.className = panel.className.includes(menuClose)
      ? panel.className.replace(menuClose, menuOpen)
      : panel.className.includes(menuOpen)
      ? panel.className
      : panel.className + " " + menuOpen);
  } else {
    return (panel.className = panel.className.includes(menuOpen)
      ? panel.className.replace(menuOpen, menuClose)
      : panel.className.includes(menuClose)
      ? panel.className
      : panel.className + " " + menuClose);
  }
}

{
  /* <div class="dg_toggleall">
    <button
      class="dg_allitems"
      id="menuActionButton"
      onclick="AllMenuItemsAction(this)"
    >
      Open All
    </button>
    <button class="dg_accordion" onclick="MenuAction(this)">
      Section 1
    </button>
    <div class="panel dg_menuclosed" id="menuItem1">
      <p>Lorem ipsum...</p>
    </div>
    <button class="dg_accordion" onclick="MenuAction(this)">
      Section 2
    </button>
    <div class="panel dg_menuclosed" id="menuItem2">
      <p>Lorem ipsum...</p>
    </div>
    <button class="dg_accordion" onclick="MenuAction(this)">
      Section 3
    </button>
    <div class="panel dg_menuclosed" id="menuItem3">
      <p>Lorem ipsum...</p>
    </div>
  </div>
  <div>
    <button
      class="dg_allitems"
      id="menuActionButton"
      onclick="AllMenuItemsAction(this)"
    >
      Open All
    </button>
    <button class="dg_accordion" onclick="MenuAction(this)">
      New Section 1
    </button>
    <div class="panel dg_menuclosed" id="menuItem1">
      <img
        width="300"
        height="200"
        alt="Stuff goes here"
        src="//baltimorecountymd.gov/sebin/t/t/homepage-county-executive.jpg"
        border="0"
        vspace="0"
        hspace="0"
      />
    </div>
    <button class="dg_accordion" onclick="MenuAction(this)">
      New Section 2
    </button>
    <div class="panel dg_menuclosed" id="menuItem2">
      <p>Lorem ipsum...</p>
    </div>
    <button class="dg_accordion" onclick="MenuAction(this)">
      New Section 3
    </button>
    <div class="panel dg_menuclosed" id="menuItem3">
      <p>Lorem ipsum...</p>
    </div>
  </div> */
}
