// ******************************************************************************
// Determines if there are more then 2 cards and unhides the buttons if so
// ******************************************************************************
function addScrollToRouteCards() {
  var routeContanier = document.getElementById("route-info-container");
  var routeCards = routeContanier.getElementsByClassName(
    "loop-route-information-card"
  );

  var buttonContainer = document.getElementsByClassName("loop-btn-container");

  var leftArrow = buttonContainer[0].getElementsByClassName("loop-nav-left")[0];
  var rightArrow =
    buttonContainer[0].getElementsByClassName("loop-nav-right")[0];

  if (routeCards.length > 2) {
    leftArrow[0].classList.remove("invisible");
    rightArrow[0].classList.remove("invisible");
  }
}

window.addEventListener("load", addScrollToRouteCards);

// ************************************************************************************
// Scrolls the container div right or left the width of the card and the padding between
// ************************************************************************************

document.addEventListener(
  "click",
  (onDocumentClick) => {
    const { target } = onDocumentClick;
    const buttonRight = target.classList.contains("fa-arrow-circle-right");
    const buttonLeft = target.classList.contains("fa-arrow-circle-left");

    if (buttonRight || buttonLeft) {
      //We need to find the padding value between the cards to add to the max offset in order to scroll a full card over or back
      var elem = document.querySelector(".p-4");

      var elemStyle = getComputedStyle(elem);
      var padding = elemStyle.paddingRight;
      var paddingValue = parseInt(padding.split("px")[0]); //returns a string and we want the integer value so removing the px

      //gets a card for us to grab its Width. Cards are all the same size so we just need the value of the first one.
      const routeContanier = document.getElementById("route-info-container");
      const routeCards = routeContanier.getElementsByClassName(
        "loop-route-information-card"
      )[0];
      const elemWidth = routeCards.clientWidth;
      const cardContainer = document.getElementsByClassName(
        "container-loop-card"
      )[0];

      var scrollDuration = 1000;
      var scrollValue = elemWidth + paddingValue;
      var containerPosition = $(cardContainer).scrollLeft();

      //Switched to jquery here for the animation. The scroll was instant before and looked broken. This adds a 1sec transition which seems more natural
      buttonRight
        ? $(cardContainer).animate(
            { scrollLeft: containerPosition + scrollValue },
            scrollDuration
          )
        : $(cardContainer).animate(
            { scrollLeft: containerPosition - scrollValue },
            scrollDuration
          );
    }
  },
  false
);
