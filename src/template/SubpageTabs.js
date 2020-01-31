document.addEventListener("DOMContentLoaded", function() {
  var menu, toggleButton;

  menu = document.getElementById("dg_tabs");
  toggleButton = document.getElementById("dg_menu-trigger-btn");

  toggleButton.addEventListener("click", function(clickEvent) {
    clickEvent.preventDefault();
    menu.classList.toggle("open");
  });
});
