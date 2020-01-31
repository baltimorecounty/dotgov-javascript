document.addEventListener("DOMContentLoaded", function() {
  const menu = document.getElementById("dg_tabs");
  const toggleButton = document.getElementById("dg_menu-trigger-btn");

  toggleButton.addEventListener("click", function(clickEvent) {
    clickEvent.preventDefault();
    menu.classList.toggle("open");
  });
});
