//*******************************/
//This needs to be addd directly onto a SE template in order for the race condition to be avoided
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//That script needs to be added as well for jquery to work.
//*******************************/
(function ($) {
  if ($("#dg_back-to-top").length) {
    var scrollTrigger = 200, // px
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $("#dg_back-to-top").addClass("show");
        } else {
          $("#dg_back-to-top").removeClass("show");
        }
      };
    backToTop();
    $(window).on("scroll", function () {
      backToTop();
    });
    $("#dg_back-to-top").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }
})(jQuery);
