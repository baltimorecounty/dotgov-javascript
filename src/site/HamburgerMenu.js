document.addEventListener("DOMContentLoaded", function() {
  var menu, toggleButton, closeButton;

  menu = document.getElementById("slide-menu");
  toggleButton = document.getElementById("menu-trigger-btn");
  closeButton = document.getElementById("cntnt-ovrly");

  toggleButton.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.classList.toggle("open");
  });

  closeButton.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.classList.remove("open");
  });
});
