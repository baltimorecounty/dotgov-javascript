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
    (function() {
      // Dev cx = "007558505509255245046:qayakxzcib0"
      // Prod cx = "007558505509255245046:qqwcx9uroqk"
      var cx = "007558505509255245046:qqwcx9uroqk";
      var gcse = document.createElement("script");
      gcse.type = "text/javascript";
      gcse.async = true;
      gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
      gcse.onload = function() {
        var getElmInterval = setInterval(function() {
          var searchContainer = $getSearchContainer();
          if (searchContainer) {
            // Remove Google styles
            searchContainer.find("[class]").removeAttr("class");

            var searchButton = searchContainer.find("button");
            if (searchButton) {
              searchButton.parent().remove();
            }
            var clearButton = searchContainer.find("[title='clear results']");
            if (clearButton) {
              clearButton.parent().remove();
            }
            $("#gs_st50")
              .parent()
              .remove();

            // Add DG styles
            var searchForm = searchContainer.find("form");
            if (searchForm && searchForm[0]) {
              searchForm[0].classList.add("dg_search-container");
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
              searchInput[0].classList.add("dg_search-input");
              searchInput[0].placeholder =
                "Search for agencies, services and more...";
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

    document.addEventListener(
      "blur",
      function(e) {
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
    var element = document.getElementsByClassName("gsc-completion-container");
    if (currentWindowWidth <= 900) {
      if (element) {
        for (var i = 0; i < element.length; i += 1) {
          element[i].style.display = "none";
        }
      }
    } else {
      if (element) {
        for (var i = 0; i < element.length; i += 1) {
          element[i].style.display = "";
        }
      }
    }

    var $targetContainer = $getSearchContainer();
    var intervalCheck = setInterval(function() {
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
  const handlefocusout = clickEvent => {
    var compareElement = $.trim(clickEvent.target.classList);
    var gscElement = document.getElementsByClassName("gsc-completion-container");
    if (
      compareElement == "no-cssgridlegacy cssgrid" ||
      compareElement == "dg_search-container"
    ) {
  
      if (gscElement) {
        for (var i = 0; i < gscElement.length; i += 1) {
          gscElement[i].style.display = "none";
        }
      }
      return;
    } else if (compareElement == "dg_search-input") {
      if (gscElement) {
        for (var i = 0; i < gscElement.length; i += 1) {
          gscElement[i].style.display = "";
        }
      }
      return;
    } else {
      const flyoutElement = document.getElementById("div-search-form");
      if (flyoutElement) {
        let targetElement = clickEvent.target; // clicked element
        do {
          if (targetElement == flyoutElement) {

            if (gscElement) {
              for (var i = 0; i < gscElement.length; i += 1) {
                gscElement[i].style.display = "none";
              }
            }
            return;
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
        } while (targetElement);
        if (targetElement == null) {
          return;
        } else {

          if (gscElement) {
            for (var i = 0; i < gscElement.length; i += 1) {
              gscElement[i].style.display = "none";
            }
          }
        }
      }
    }
  };
  initGoogleSearch();

  $(document).ready(onSearchReady);

  /* Submit url to rate form */
  $(document).on("submit", "#RateThisPageForm", onPageRating);

  $(window).on("resize", onWindowResize);
  document.addEventListener("click", handlefocusout, false);
})(jQuery);
