const mobileSearchId = "dg_mobile-search-button";

const cssClasses = {
  closeSearchIcon: "fa-times",
  expandSearchIcon: "fa-search"
};

const toggleSiteSearch = clickEvent => {
  const mobileSearchIcons = document
    .getElementById(mobileSearchId)
    .querySelectorAll("i");

  if (mobileSearchIcons.length > 0) {
    const searchIcon = mobileSearchIcons[0];
    const shouldCollapseSearch = searchIcon.classList.contains(
      cssClasses.closeSearchIcon
    );

    // Reset Icon
    searchIcon.classList.remove(
      ...[cssClasses.expandSearchIcon, cssClasses.closeSearchIcon]
    );

    searchIcon.classList.add(
      shouldCollapseSearch
        ? cssClasses.expandSearchIcon
        : cssClasses.closeSearchIcon
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
