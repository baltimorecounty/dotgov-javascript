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

if (elementHeader) {
  var header = elementHeader[0];

  var sticky = header.offsetTop;
  var headerCSS = "dg_site-header-sticky-IE";

  if (isIE) {
    window.onscroll = function () {
      if (window.pageYOffset > sticky && isIE) {
        header.classList.add(headerCSS);
      } else {
        header.classList.remove(headerCSS);
      }
    };
  }
}
