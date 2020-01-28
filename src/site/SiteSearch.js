const mobileSearchId = "dg_mobile-search-button";
const searchForm = "search-form";

const cssClasses = {
  closeSearchIcon: "fa-times",
  expandSearchIcon: "fa-search",
  isVisible: "is-visible"
};

const toggleSiteSearch = clickEvent => {
  const mobileSearchIcons = document
    .getElementById(mobileSearchId)
    .querySelectorAll("i");

  if (mobileSearchIcons.length > 0) {
    const searchIconElm = mobileSearchIcons[0];
    const searchFormElm = document.getElementById(searchForm);
    const shouldCollapseSearch = searchIconElm.classList.contains(
      cssClasses.closeSearchIcon
    );

    // Reset Icon
    searchIconElm.classList.remove(
      ...[cssClasses.expandSearchIcon, cssClasses.closeSearchIcon]
    );

    searchIconElm.classList.add(
      shouldCollapseSearch
        ? cssClasses.expandSearchIcon
        : cssClasses.closeSearchIcon
    );

    searchFormElm.classList.remove(cssClasses.isVisible);
    searchFormElm.classList.add(
      shouldCollapseSearch ? "" : cssClasses.isVisible
    );
  } else {
    console.error(
      `You are missing a button element with the id: ${mobileSearchId}.`
    );
  }
};

document
  .getElementById(mobileSearchId)
  .addEventListener("click", toggleSiteSearch, false);
