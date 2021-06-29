function AddIconToPdf() {
  var anchors = document.getElementsByTagName("a");

  for (var i = 0; i < anchors.length; i++) {
    var imgPDF = new Image();
    var imgExternal = new Image();
    imgPDF.src =
      "https://www.adobe.com/content/dam/cc/en/legal/images/badges/PDF_32.png";
    imgExternal.src =
      "https://www.baltimorecountymd.gov/sebin/j/r/icon-link-image.png";
    imgPDF.alt = "pdf";
    imgPDF.click()
    if (anchors[i].href != "") {
      if (anchors[i].href.indexOf(".pdf") > -1) {
        anchors[i].after(imgPDF);
      } else if (anchors[i].href.indexOf("baltimorecountymd") === -1) {
        anchors[i].after(imgExternal);
      }
    }
  }
}

window.addEventListener("load", AddIconToPdf);
