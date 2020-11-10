const mobileSearchButtonId = "dg_mobile-search-button";
const searchForm = "search-form";

const cssClasses = {
  closeSearchIcon: "fa-times",
  expandSearchIcon: "fa-search",
  isVisible: "is-visible",
};

/**
 * Changes the mobile search buttons icon to a close button when shouldCollapseSearch search is set to false.
 * Otherwise the icon will change to a search icon
 * @param {*} searchIconElm icon element for the mobile search button
 * @param {*} shouldCollapseSearch if true, the result of this function will be to hide the search form
 */
const updateSearchIcon = (searchIconElm, shouldCollapseSearch) => {
  // Reset Icon
  searchIconElm.classList.remove(
    ...[cssClasses.expandSearchIcon, cssClasses.closeSearchIcon]
  );

  searchIconElm.classList.add(
    shouldCollapseSearch
      ? cssClasses.expandSearchIcon
      : cssClasses.closeSearchIcon
  );
};

/**
 * Hides / Shows search form based on shouldCollapse search flag
 * @param {*} searchFormElm icon element for the mobile search button
 * @param {boolean} shouldCollapseSearch if true, the result of this function will be to hide the search form
 */

const toggleSearchForm = (searchFormElm, shouldCollapseSearch) => {
  searchFormElm.classList.remove(cssClasses.isVisible);
  shouldCollapseSearch
    ? null
    : searchFormElm.classList.add(cssClasses.isVisible);

  var gscElement = document.getElementsByClassName("gsc-completion-container");

  if (gscElement[0]) {
    searchFormElm.classList.contains(cssClasses.isVisible)
      ? (gscElement[0].style.display = "")
      : (gscElement[0].style.display = "none");

      if (searchFormElm.classList.contains(cssClasses.isVisible)){
        var gscElement50 = document.getElementsByClassName("gstl_50 gssb_c");
        if(gscElement50[0]){
          gscElement50[0].style.left="14px";
          gscElement50[0].style.top="145px";
        }
      }
  }
};

/**
 * Toggle Site Search based on whether the mobile search button is selected or not
 */
const toggleSiteSearch = () => {
  const mobileSearchIcons = document
    .getElementById(mobileSearchButtonId)
    .querySelectorAll("i");

  if (mobileSearchIcons.length > 0) {
    const searchIconElm = mobileSearchIcons[0];
    const searchFormElm = document.getElementById(searchForm);
    const shouldCollapseSearch = searchIconElm.classList.contains(
      cssClasses.closeSearchIcon
    );

    updateSearchIcon(searchIconElm, shouldCollapseSearch);
    toggleSearchForm(searchFormElm, shouldCollapseSearch);
  } else {
    console.error(
      `You are missing a button element with the id: ${mobileSearchButtonId}.`
    );
  }
};

/** Events  */
if (document.getElementById(mobileSearchButtonId)) {
  document
    .getElementById(mobileSearchButtonId)
    .addEventListener("click", toggleSiteSearch, false);
}
