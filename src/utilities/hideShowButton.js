function hideButton() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer, return version number
    var showMoreLessButton = document.getElementById("toggle-btn");
    showMoreLessButton.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", hideButton());
