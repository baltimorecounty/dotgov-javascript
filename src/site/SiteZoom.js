//This script lives in the _inclusions > template > scripts > scripts-site-js file in SE.

//https://stackoverflow.com/questions/1055336/changing-the-browser-zoom-level
//Firefox is excluded from this list along with IE and all mobile devices

function windowZoom() {
  var newZoom = "80%";
  var standardZoom = "100%";

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  var isMobile = false;

  if (/Mobi|Android/i.test(ua)) {
    isMobile = true;
  }

  if (msie > -1 || !!ua.match(/Trident.*rv\:11\./)) {
  } else {
    if (
      document.documentElement.clientWidth <= 1400 &&
      document.documentElement.clientWidth >= 768
    ) {
      isMobile
        ? (document.body.style.zoom = standardZoom)
        : (document.body.style.zoom = newZoom);
    } else {
      document.body.style.zoom = standardZoom;
    }
  }
}

window.addEventListener("resize", windowZoom);

window.addEventListener("load", windowZoom);
