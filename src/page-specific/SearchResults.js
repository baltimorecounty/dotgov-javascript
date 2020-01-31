import { Urls } from "@baltimorecounty/javascript-utilities";

const { GetParameterByName } = Urls;

/** Shows a friendly message to the user if no search term is "searched" */
const handleEmptySearch = () => {
  const searchTerm = GetParameterByName("q");

  if (!searchTerm) {
    const mainContentElm = document.getElementById("dg_main-content");
    const noResultsElm = document.createElement("p");
    noResultsElm.innerHTML =
      "The search term you used was empty, please try again using the site search.";
    mainContentElm.insertBefore(noResultsElm, mainContentElm.firstChild);
  }
};

const onDocumentReady = () => {
  handleEmptySearch();
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);
