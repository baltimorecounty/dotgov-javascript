import "../polyfills/after.polyfill";

function AddIconToPdf() {
  var anchors = [].slice.call(document.getElementsByTagName("a"));
  var footer = document.getElementsByTagName("footer");
  var sideSection = document.getElementsByClassName("dg_sidebar__section");

  var footerAnchors = [];
  footerAnchors = [].slice.call(footer[0].getElementsByTagName("a"));

  for (var i = 0; i < footer.length; i++) {
    var elements = footer[i].getElementsByTagName("a");
    var items = [].slice.call(elements);
    items.forEach((x) => footerAnchors.push(x));
  }

  var sideBarSectionAnchors = [];
  var sideBarAnchors = [];

  var iconLinks = [].slice.call(
    document.getElementsByClassName("dg_icon-link")
  );

  var buttonLinks = [].slice.call(document.getElementsByClassName("dg_button"));

  for (var i = 0; i < sideSection.length; i++) {
    sideBarSectionAnchors = [].slice.call(
      sideSection[i].getElementsByTagName("a")
    );
    for (var j = 0; j < sideBarSectionAnchors.length; j++) {
      sideBarAnchors.push(sideBarSectionAnchors[j]);
    }
  }

  let neededElements = anchors
    .filter((item) => !footerAnchors.includes(item))
    .filter((item) => !sideBarAnchors.includes(item))
    .filter((item) => !iconLinks.includes(item))
    .filter((item) => !buttonLinks.includes(item))
    .filter((item) => item.id != "twitterButton")
    .filter((item) => item.id != "facebookButton")
    .filter((item) => item.href != "")
    .filter((item) => item.href.indexOf("mailto:") != 0)
    .filter((item) => item.href.indexOf("tel:") != 0)
    .filter((item) => item.href.indexOf("javascript:") != 0)
    .filter((item) => item.href.indexOf("https://cse.google.com/") != 0)
    .filter((item) => item.href.indexOf("https://www.google.com/search") != 0);

  for (var i = 0; i < neededElements.length; i++) {
    var imgPDF = new Image();
    var anchor = document.createElement("a");
    imgPDF.classList.add("dg_external-link-image");
    imgPDF.alt = "pdf";
    imgPDF.src =
      "https://www.baltimorecountymd.gov/sebin/n/n/icon-pdf-solid.png";

    var imgExternal = new Image();
    imgExternal.alt = "external link";
    imgExternal.src =
      "https://www.baltimorecountymd.gov/sebin/j/s/icon-link-image.png";
    imgExternal.classList.add("dg_external-link-image");

    if (neededElements[i].href.indexOf(".pdf") > -1) {
      anchor.href = neededElements[i].href;
      anchor.appendChild(imgPDF);
      neededElements[i].after(anchor);
    } else if (neededElements[i].href.indexOf("baltimorecountymd.gov") === -1) {
      anchor.href = neededElements[i].href;
      anchor.appendChild(imgExternal);
      neededElements[i].after(anchor);
    } else if (
      neededElements[i].href.indexOf("baltimorecountymd.webex.com") > -1
    ) {
      anchor.href = neededElements[i].href;
      anchor.appendChild(imgExternal);
      neededElements[i].after(anchor);
    }
  }
}

window.addEventListener("load", AddIconToPdf);
