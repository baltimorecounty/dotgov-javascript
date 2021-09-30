function NoResults() {
  var findResults = document.getElementsByClassName("gs-title");
  var finNoResultsDiv = document.getElementsByClassName("gs-snippet");

  if (findResults.length > 0) {
    for (let i = 0; i < finNoResultsDiv.length; i++) {
      if ((finNoResultsDiv[i].innerHTML = "No Results")) {
        finNoResultsDiv[i].style.display = "none";
      }
    }
  }
}

window.addEventListener("load", NoResults);
