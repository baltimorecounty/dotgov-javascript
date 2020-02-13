document.addEventListener("DOMContentLoaded", function() {
  const menu = document.getElementById("dg_tabs");
  const toggleButton = document.getElementById("dg_menu-trigger-btn");

  toggleButton.addEventListener("click", function(clickEvent) {
    clickEvent.preventDefault();
    menu.classList.toggle("open");
  });
});

window.onscroll = function() {
  stickyFunction();
};

const subTabs = document.getElementById("dg_sticky-component");

const sticky = subTabs.offsetTop;

function stickyFunction() {
  if (window.pageYOffset > sticky) {
    subTabs.classList.add("dg_sticky-component");
  } else {
    subTabs.classList.remove("dg_sticky-component");
  }
}
