function addScrollToRouteCards() {
  var routeContanier = document.getElementById("route-info-container");
  var routeCards = routeContanier.getElementsByClassName(
    "loop-route-information-card"
  );

  var buttonContainer = document.getElementsByClassName("loop-btn-container");

  var leftArrow = buttonContainer[0].getElementsByClassName("loop-nav-left")[0];
  var rightArrow =
    buttonContainer[0].getElementsByClassName("loop-nav-right")[0];

  console.log(leftArrow);
  console.log(rightArrow);
  console.log(routeCards.length);

  if (routeCards.length <= 2) {
    leftArrow[0].classList.add("invisible");
    rightArrow[0].classList.add("invisible");
  } else {
    leftArrow[0].classList.remove("visible");
    rightArrow[0].classList.remove("visible");
  }

}

window.addEventListener("load", addScrollToRouteCards);

document.addEventListener(
  "click",
  (onDocumentClick) => {
    const { target } = onDocumentClick;
    const parentDiv = target.closest("div");
    const targetClassList = parentDiv.classList;
    const isNavButton =
      targetClassList.contains("loop-nav-left") ||
      targetClassList.contains("loop-nav-right");

    if (isNavButton) {
      console.log("Hello World " + targetClassList);
    } else {
      return;
    }
  },
  false
);

function scrollTo (el) {
  const elLeft = el.offsetLeft + el.offsetWidth;
  const elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;

  // check if element not in view
  if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
    el.parentNode.scrollLeft = elLeft - elParentLeft;
  } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
    el.parentNode.scrollLeft = el.offsetLeft - el.parentNode.offsetLeft;
  }
}