//This is to be removed after the A/B test is complete.

// window.onload = function () {
//   var BCPage = $("#bc_page");
//   var header = $(".dg_header ");

//   $(header[0]).insertBefore(BCPage);
// };

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isIE = msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

var elementHeader = document.getElementsByClassName("dg_header");
var elementMenu = document.getElementsByClassName("bc_site-nav__toggle-button");
var header = elementHeader[0];
var menu = elementMenu[0];
var sticky = header.offsetTop;

var headerCSS = "dg_site-header-sticky";
var menuCSS = "bc_site-nav__toggle-button-sticky";

window.onscroll = function () {
  if (window.pageYOffset > sticky) {
    isIE
      ? header.classList.add(headerCSS + "-IE")
      : header.classList.add(headerCSS);
    menu.classList.add(menuCSS);
  } else {
    isIE
      ? header.classList.remove(headerCSS + "-IE")
      : header.classList.remove(headerCSS);
    menu.classList.remove(menuCSS);
  }
};
