window.addEventListener(
  "DOMContentLoaded",
  (function ($) {
    var headerElement = document.getElementsByClassName(
      "dg_page-header__title"
    );
    var headerTitle = headerElement[0].innerHTML;

    var parkHeaderImage = $("#parkHeaderImage");
    var parkImage = $("#parkImage");

    parkHeaderImage.prop("alt", headerTitle);
    parkImage.prop("alt", headerTitle);
  })(jQuery)
);
