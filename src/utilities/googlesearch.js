(function onTemplateEventsInit($) {
  var resizeTimer;
  var windowWidth;

  function $getSearchContainer(width) {
    return isMobile(width)
      ? $("#search-container")
      : $("#internal-search-container");
  }

  function removeBackGround(oElem) {
    oElem.style.background = "";
  }

  function initGoogleSearch() {
    (function () {
      // Dev cx = "007558505509255245046:qayakxzcib0"
      // Prod cx = "007558505509255245046:qqwcx9uroqk"
      var cx = "007558505509255245046:qqwcx9uroqk";
      var gcse = document.createElement("script");
      gcse.type = "text/javascript";
      gcse.async = true;
      gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
      gcse.onload = function () {
        var getElmInterval = setInterval(function () {
          var searchInput = document.querySelectorAll(
            ".gsib_a input.gsc-input"
          );

          if (searchInput && searchInput[0]) {
            clearInterval(getElmInterval);
            searchInput[0].removeAttribute("style");
            searchInput[0].style.background = removeBackGround(searchInput[0]);
            if (searchInput[0].classList.contains("gsc-input")) {
              searchInput[0].classList.remove("gsc-input");
            }
            searchInput[0].classList.add("dg_search-input");
            searchInput[0].placeholder =
              "Search for agencies, services and more...";
          }

          var searchButton = $(".gsc-search-button");
          searchButton.remove();
        }, 100);
      };
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(gcse, s);
    })();
  }

  function isMobile(width) {
    var mediaWidth = 990;
    var scrollBar = 15;
    return width < mediaWidth - scrollBar;
  }

  function onPageRating() {
    // eslint-disable-line consistent-return
    var urlElm = document.getElementById("url");

    if (urlElm) {
      urlElm.value = window.location.href;
    }

    if ($("input#website").val().length) {
      return false;
    }
  }

  function onSearchReady() {
    windowWidth = $(window).width();
    if (isMobile(windowWidth)) {
      repositionSearchBox(windowWidth);
    }
    document.addEventListener(
      "blur",
      function (e) {
        var searchbarElements = document.getElementsByClassName(
          "dg_search-input"
        );
        var searchbar =
          searchbarElements.length > 0 ? searchbarElements[0] : null;
        if (e.target == searchbar) {
          e.stopPropagation();
        }
      },
      true
    );
  }

  function onWindowResize() {
    var $window = $(window);
    var newWindowWidth = $window.width();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function waitForResizeToFinish() {
      if (newWindowWidth !== windowWidth) {
        repositionSearchBox(newWindowWidth);
        windowWidth = newWindowWidth;
      }
    }, 100);
  }

  function repositionSearchBox(currentWindowWidth) {
    var $targetContainer = $getSearchContainer(currentWindowWidth);
    var intervalCheck = setInterval(function () {
      if (
        $getSearchContainer.length &&
        $(".gsc-control-searchbox-only").length
      ) {
        clearInterval(intervalCheck);
        var searchFormHtml = $(".gsc-control-searchbox-only")
          .closest("div")
          .detach();
        $targetContainer.append(searchFormHtml);
      }
    }, 100);
  }

  initGoogleSearch();

  $(document).ready(onSearchReady);

  /* Submit url to rate form */
  $(document).on("submit", "#RateThisPageForm", onPageRating);

  $(window).on("resize", onWindowResize);
})(jQuery);
