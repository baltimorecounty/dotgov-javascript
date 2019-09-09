document.addEventListener("DOMContentLoaded", function() {
  var contentWrapper, menu, menuToggle, toggleButton, closeButton;

  contentWrapper = document.getElementById("content");
  menu = document.getElementById("dg_slide-menu");
  menuToggle = document.getElementById("dg_menu-toggle");
  toggleButton = document.getElementById("dg_menu-trigger-btn");
  closeButton = document.getElementById("dg_cntnt-ovrly");

  toggleButton.addEventListener("click", function(c) {
    c.preventDefault();
    closeButton.classList.toggle("dg_menu-active");
    contentWrapper.classList.toggle("dg_menu-active");
    menu.classList.toggle("dg_menu-active");
  });

  closeButton.addEventListener("click", function(c) {
    c.preventDefault();
    menu.classList.toggle("dg_menu-active");
  });
});
