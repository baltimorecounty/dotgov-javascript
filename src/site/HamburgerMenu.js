document.addEventListener("DOMContentLoaded", function() {
  var contentWrapper, menu, menuToggle, toggleButton, closeButton;

  contentWrapper = document.getElementById("content");
  menu = document.getElementById("slide-menu");
  menuToggle = document.getElementById("menu-toggle");
  toggleButton = document.getElementById("menu-trigger-btn");
  closeButton = document.getElementById("cntnt-ovrly");

  toggleButton.addEventListener("click", function(c) {
    c.preventDefault();
    contentWrapper.classList.toggle("menu-active");
    menu.classList.toggle("menu-active");
  });

  closeButton.addEventListener("click", function(c) {
    c.preventDefault();
    menu.classList.toggle("menu-active");
  });
});
