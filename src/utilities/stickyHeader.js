

//This is to be removed after the A/B test is complete.

// window.onload = function () {
//   var BCPage = $("#bc_page");
//   var header = $(".dg_header ");

//   $(header[0]).insertBefore(BCPage);
// };

window.onscroll = function () {
  var elementHeader = document.getElementsByClassName("dg_header");
  var elementMenu = document.getElementsByClassName(
    "bc_site-nav__toggle-button"
  );
  var header = elementHeader[0];
  var menu = elementMenu[0];
  var sticky = header.offsetTop;

  if (window.pageYOffset > sticky) {
    header.classList.add("dg_site-header-sticky");
    menu.classList.add("bc_site-nav__toggle-button-sticky");
  } else {
    header.classList.remove("dg_site-header-sticky");
    menu.classList.remove("bc_site-nav__toggle-button-sticky");
  }
};
