const findCurrentRelatedLink = () => {
  var list = document.getElementsByClassName("dg_alt-list");
  var url = window.location.href;
  var index = url.indexOf("?");
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
