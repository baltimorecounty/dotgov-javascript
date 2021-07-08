function AddIconToPdf() {
  var anchors = [].slice.call(document.getElementsByTagName("a"));
  var footer = document.getElementsByTagName("footer");

  var footerAnchors = [];
  footerAnchors = [].slice.call(footer[0].getElementsByTagName("a"));

  for (var i = 0; i < footer.length; i++) {
    var elements = footer[i].getElementsByTagName("a");
    var items = [].slice.call(elements);
    items.forEach((x) => footerAnchors.push(x));
  }

  let neededElements = anchors.filter((item) => !footerAnchors.includes(item));

  for (var i = 0; i < neededElements.length; i++) {
    var imgPDF = new Image();
    imgPDF.classList.add("dg_external-link-image");
    imgPDF.alt = "pdf";
    imgPDF.src =
      "https://dev.baltimorecountymd.gov/sebin/n/n/icon-pdf-solid.png";

    var imgExternal = new Image();
    imgExternal.alt = "external link";
    imgExternal.src =
      "https://www.baltimorecountymd.gov/sebin/j/r/icon-link-image.png";
    imgExternal.classList.add("dg_external-link-image");

    if (neededElements[i].href != "") {
      if (neededElements[i].href.indexOf(".pdf") > -1) {
        neededElements[i].after(imgPDF);
      } else if (neededElements[i].href.indexOf("baltimorecountymd") === -1) {
        neededElements[i].after(imgExternal);
      } else if (neededElements[i].href.indexOf("webex") > -1) {
        neededElements[i].after(imgExternal);
      }
    }
  }
}

window.addEventListener("load", AddIconToPdf);
