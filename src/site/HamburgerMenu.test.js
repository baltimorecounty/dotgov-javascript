document.addEventListener("DOMContentLoaded", function() {
  var contentWrapper, menu, menuToggle, toggleButton, closeButton;

  contentWrapper = document.getElementById("content");
  menu = document.getElementById("dg_site-menu");
  menuToggle = document.getElementById("dg_menu-toggle");
  toggleButton = document.getElementById("dg_menu-trigger-btn");
  closeButton = document.getElementById("dg_cntnt-ovrly");

  toggleButton.addEventListener("click", function(c) {
    c.preventDefault();
    contentWrapper.classList.toggle("active");
    menu.classList.toggle("active");
  });

  closeButton.addEventListener("click", function(c) {
    c.preventDefault();
    contentWrapper.classList.remove("active");
    menu.classList.remove("active");
    closeButton.classList.toggle("active");
  });
});
