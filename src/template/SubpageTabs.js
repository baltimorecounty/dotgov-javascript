document.addEventListener("DOMContentLoaded", function() {
  var menu, menuToggle, toggleButton;

  menu = document.getElementById("dg_tabs");
  menuToggle = document.getElementById("dg_menu-toggle");
  toggleButton = document.getElementById("dg_menu-trigger-btn");

  toggleButton.addEventListener("click", function(clickEvent) {
    clickEvent.preventDefault();
    menu.classList.toggle("open");
  });
});
