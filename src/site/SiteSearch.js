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
  searchFormElm.classList.add(shouldCollapseSearch ? "" : cssClasses.isVisible);
  var element = document.getElementsByClassName("gsc-completion-container");
  if (element) {
    if (shouldCollapseSearch) {
      element.style.display = "none";
    } else {
      element.style.display = "show";
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
