//https://stackoverflow.com/questions/1055336/changing-the-browser-zoom-level
//Firefox is excluded from this list along with IE

function windowZoom() {
  var newZoom = "80%";
  var standardZoom = "100%";

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
  } else {
    if (
      document.documentElement.clientWidth <= 1400 &&
      document.documentElement.clientWidth >= 768
    ) {
      document.body.style.zoom = newZoom;
    } else {
      document.body.style.zoom = standardZoom;
    }
  }
}

window.addEventListener("load", windowZoom);
