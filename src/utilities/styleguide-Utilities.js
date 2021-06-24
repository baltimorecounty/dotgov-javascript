//******************************************************************* */
//Style Guide Filter search box
function filterStyleGuide(input) {
  var parentDiv = document.getElementsByClassName("styleguide-left-navigation");
  var header = parentDiv[0].getElementsByTagName("h3");
  var lists = parentDiv[0].getElementsByTagName("ul");

  for (var i = 0; i < lists.length; i++) {
    var listItems = lists[i].getElementsByTagName("li");
    for (var j = 0; j < listItems.length; j++) {
      if (
        listItems[j].innerHTML
          .toLowerCase()
          .indexOf(input.value.toLowerCase().trim()) > -1
      ) {
        listItems[j].style.display = "";
      } else {
        listItems[j].style.display = "none";
      }
    }
  }
}
//*************************************************************** */

//*************************************************************** */
//Style guide hamburger menu
$(document).ready(function () {
  var menus = $("#styleguide-hamburger, #styleguide-mobile-menu");

  for (var i = 0; i < menus.length; i++) {
    menus[i].click(function () {
      $(this).toggleClass("open");
    });
  }
});

$(document).ready(function () {
  $("#styleguide-hamburger").on("click", function () {
    $(this).toggleClass("open");
    $("#styleguide-mobile-menu").toggleClass("open");
  });
});

window.addEventListener("resize", function () {
  if (document.documentElement.clientWidth >= 767) {
    $("#styleguide-hamburger").removeClass("open");
    $("#styleguide-mobile-menu").removeClass("open");
  }
});
//*************************************************** */
