$(document).ready(function() {
  $("#menu-trigger-btn").click(function() {
    $(this).toggleClass("open");
    $("#slide-menu,#menu-toggle,#content,#menu-overlay").toggleClass(
      "menu-active"
    );
  });

  $("#cntnt-ovrly").click(function() {
    $("*").removeClass("menu-active");
    $("*").removeClass("disabled");
  });

  $("#logo_toggle").click(function() {
    $("*").removeClass("menu-active");
  });
});

document.getElementById("menu-trigger-btn").addEventListener("click", mainMenu);
document.addEventListener("DOMContentLoaded", function(){
function mainMenu() {
  var element = document.getElementById("wrapper");
  document.body.classList.toggleClass("menu-open");
}
