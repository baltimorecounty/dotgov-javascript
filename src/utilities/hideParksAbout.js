function hideAbout() {
  var parksAboutContent = document.getElementById("dg_parks_about_content");
  var parksAboutHeader = document.getElementById("dg_parks_about_header");

  if (parksAboutContent) {
    if (parksAboutContent.children.length < 1) {
      parksAboutHeader.style.display = "none";
    }
  }
}

window.addEventListener("DOMContentLoaded", hideAbout());
