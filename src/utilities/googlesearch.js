const placeHolderText = {
  dotgov: "Search for agencies, services and more...",
  loop: "Search for maps, schedules and more...",
};

const searchCSS = {
  dotgov_container: "dg_search-container",
  dotgov_button: "dg_search-btn",
  dotgov_input: "dg_search-input",
  loop_container: "loop_search-container",
  loop_button: "loop_search-btn",
  loop_input: "loop_search-input",
};

const url = window.location.href;
const isLoopApp = url.indexOf("the-loop") > -1;

(function onTemplateEventsInit($) {
  var resizeTimer;
  var windowWidth;

  function $getSearchContainer() {
    return $("#___gcse_0");
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
          var searchContainer = $getSearchContainer();
          if (searchContainer) {
            // Remove Google styles
            searchContainer.find("[class]").removeAttr("class");

            // Replace search button contents
            var searchButton = searchContainer.find("button");
            if (searchButton) {
              searchButton.empty();
              isLoopApp
                ? searchButton.addClass(searchCSS.loop_button)
                : searchButton.addClass(searchCSS.dotgov_button);
              searchButton.append(
                '<i class="fas fa-search" aria-hidden="true"></i>'
              );
            }

            var clearButton = searchContainer.find("[title='clear results']");
            if (clearButton) {
              clearButton.parent().remove();
            }
            $("#gs_st50").parent().remove();

            // Add DG styles
            var searchForm = searchContainer.find("form");
            if (searchForm && searchForm[0]) {
              isLoopApp
                ? searchForm[0].classList.add(searchCSS.loop_container)
                : searchForm[0].classList.add(searchCSS.dotgov_container);
              var outerTable = searchForm.children();
              if (outerTable) {
                outerTable.attr("style", "width:100%");
              }
            }

            var searchInput = searchContainer.find("input");
            if (searchInput && searchInput[0]) {
              clearInterval(getElmInterval);
              searchInput[0].removeAttribute("style");
              searchInput[0].style.background = removeBackGround(
                searchInput[0]
              );

              isLoopApp
                ? searchInput[0].classList.add(searchCSS.loop_input)
                : searchInput[0].classList.add(searchCSS.dotgov_input);

              isLoopApp
                ? (searchInput[0].placeholder = placeHolderText.loop)
                : (searchInput[0].placeholder = placeHolderText.dotgov);
            }
          }
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
    var hasDialog = document.getElementsByClassName("dialog-backdrop active");
    if (windowWidth <= 900) {
      fakeSiteButtonShowHide(hasDialog, "0");
    } else {
      fakeSiteButtonShowHide(hasDialog, "2147483647");
    }

    document.addEventListener(
      "blur",
      function (e) {
        var searchbarElements = isLoopApp
          ? document.getElementsByClassName(searchCSS.loop_input)
          : document.getElementsByClassName(searchCSS.dotgov_input);
        var searchbar =
          searchbarElements.length > 0 ? searchbarElements[0] : null;

        var gscElement = document.getElementsByClassName(
          "gsc-completion-container"
        );

        if (gscElement[0]) {
          gscElementShowHide(gscElement[0], "none");
        }

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
    var gscElement = document.getElementsByClassName(
      "gsc-completion-container"
    );
    var hasDialog = document.getElementsByClassName("dialog-backdrop active");
    if (newWindowWidth <= 900) {
      gscElementShowHide(gscElement, "none");
      fakeSiteButtonShowHide(hasDialog, "0");
    } else {
      gscElementShowHide(gscElement, "");
      fakeSiteButtonShowHide(hasDialog, "2147483647");
    }
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function waitForResizeToFinish() {
      if (newWindowWidth !== windowWidth) {
        repositionSearchBox(newWindowWidth);
        windowWidth = newWindowWidth;
      }
    }, 100);
  }

  function repositionSearchBox(currentWindowWidth) {
    var $targetContainer = $getSearchContainer();
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

  const gscElementShowHide = (gscElement, displayValue) => {
    if (gscElement) {
      for (var i = 0; i < gscElement.length; i += 1) {
        gscElement[i].style.display = displayValue;
      }
    }
  };

  const fakeSiteButtonShowHide = (hasDialog, displayValue) => {
    var fakeSiteButton = document.getElementById("bc_site-nav__toggle-button");
    if (hasDialog.length > 0) {
      fakeSiteButton.style.zIndex = displayValue;
    }
  };

  const handleClick = (clickEvent) => {
    var compareElement = $.trim(clickEvent.target.classList);
    var gscElement = document.getElementsByClassName(
      "gsc-completion-container"
    );
    if (
      compareElement == "no-cssgridlegacy cssgrid" ||
      compareElement == searchCSS.dotgov_container ||
      compareElement == searchCSS.loop_container
    ) {
      gscElementShowHide(gscElement, "none");
      document.getElementById("gsc-i-id1").value = "";
      return;
    } else if (
      compareElement == searchCSS.dotgov_input ||
      compareElement == searchCSS.loop_input
    ) {
      gscElementShowHide(gscElement, "");
      return;
    } else {
      const flyoutElement = document.getElementById("div-search-form");
      if (flyoutElement) {
        let targetElement = clickEvent.target; // clicked element
        do {
          if (targetElement == flyoutElement) {
            gscElementShowHide(gscElement, "none");
            document.getElementById("gsc-i-id1").value = "";
            return;
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
        } while (targetElement);
        if (targetElement == null) {
          return;
        } else {
          gscElementShowHide(gscElement, "none");
          document.getElementById("gsc-i-id1").value = "";
        }
      }
    }
  };

  initGoogleSearch();

  $(document).ready(onSearchReady);

  /* Submit url to rate form */
  $(document).on("submit", "#RateThisPageForm", onPageRating);
  $(window).on("resize", onWindowResize);
  document.addEventListener("click", handleClick, false);
})(jQuery);
