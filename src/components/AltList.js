//********************************************************************************************************************************
//This script changes the related links alt list items css if the current url matches the href of a list item.
//********************************************************************************************************************************

const findCurrentRelatedLink = () => {
  var list = document.getElementsByClassName("dg_alt-list");
  var url = window.location.href;
  var index = url.indexOf("?");
  //We use google translate which adds a google extension at the end of the url if in a different language. This makes sure that the correct
  //alt list item is still highlighted if google is translating and also ensures the footer is updated as well.
  var urlTranslate = url.substring(index);
  var urlNoTranslate = url.replace(urlTranslate, "");

  Array.prototype.forEach.call(list, (item) => {
    var listItem = item.getElementsByTagName("a");
    Array.prototype.forEach.call(listItem, (x) => {
      if (x.href === urlNoTranslate || x.href === url) {
        x.parentNode.className = "dg_alt-list-current";
      }
    });
  });
};

window.addEventListener("load", findCurrentRelatedLink);
