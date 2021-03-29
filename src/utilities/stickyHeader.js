window.onscroll = function () {
  headerScroll();
};

var elementHeader = document.getElementsByClassName("dg_header");
var elementMenu = document.getElementsByClassName("bc_site-nav__toggle-button");
var header = elementHeader[0];
var menu = elementMenu[0];
var sticky = header.offsetTop;

function headerScroll() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (window.pageYOffset > sticky) {
    msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) //if a boomer is using IE use a different class that makes IE not suck
      ? header.classList.add("dg_site-header-sticky-IE")
      : header.classList.add("dg_site-header-sticky");
    menu.classList.add("bc_site-nav__toggle-button-sticky");
  } else {
    msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)
      ? header.classList.remove("dg_site-header-sticky-IE")
      : header.classList.remove("dg_site-header-sticky");
    menu.classList.remove("bc_site-nav__toggle-button-sticky");
  }
}
