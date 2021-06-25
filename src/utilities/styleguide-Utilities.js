//******************************************************************* */
//Style Guide Filter search box
function filterStyleGuide(input) {
  var parentDiv = document.getElementsByClassName("styleguide-left-navigation");
  var accordion = parentDiv[0].getElementsByClassName("dg_accordion");
  var lists = parentDiv[0].getElementsByTagName("ul");

  let itemCount = 0;
  for (var i = 0; i < lists.length; i++) {
    if (!lists[i].classList.contains("styleguide-nav")) {
      var listItems = lists[i].getElementsByTagName("li");

      for (var j = 0; j < listItems.length; j++) {
        if (
          listItems[j].innerHTML
            .toLowerCase()
            .indexOf(input.value.toLowerCase().trim()) > -1
        ) {
          listItems[j].style.display = "";
          itemCount = +1;
        } else {
          listItems[j].style.display = "none";
        }
      }

      var accordion = lists[i].closest(".dg_accordion__collapsible");
      var listDiv = lists[i].closest(".collapse ");

      if (itemCount > 0) {
        accordion.classList.remove("collapsed");
        listDiv.classList.add("show");
      } else {
        accordion.classList.add("collapsed");
        listDiv.classList.remove("show");
      }
    }
    itemCount = 0;
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
