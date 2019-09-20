const states = {
  collapsed: "collapsed",
  hide: "Hide",
  show: "Show"
};

const cssClasses = {
  collapsed: "collapsed",
  stepList: "dg_step-list",
  detailsToggleButton: "dg_step-list__toggle-btn",
  details: "dg_step-list__details"
};

/**  */
const handleDetailsToggleButtonClick = clickEvent => {
  const buttonElm = clickEvent.target;
  const buttonState = buttonElm.innerText;
  const detailElms = buttonElm
    .closest("li")
    .querySelectorAll(`.${cssClasses.details}`);

  detailElms.forEach(detailElm => {
    displaySectionDetails(detailElm, buttonState);
  });

  toggleButtonText(buttonElm, buttonState);
};

/**
 * Hide details for a given section of the step list
 * @param {*} detailsSectionElm
 */
const displaySectionDetails = (detailsSectionElm, buttonState) => {
  detailsSectionElm.style.display = isButtonStateShow(buttonState)
    ? "block"
    : "none";
};

const onDocumentReady = () => {
  // Get All Accordions
  const stepListElms = document.querySelectorAll(`.${cssClasses.stepList}`);

  // Check the state of each accordion
  stepListElms.forEach(stepListElm => {
    const isDefaultStateCollapsed = stepListElm.classList.contains(
      states.collapsed
    );

    if (isDefaultStateCollapsed) {
      updateSections(stepListElm, states.show);
    }
  });
};

const toggleButtonText = (buttonElm, buttonState) => {
  buttonElm.innerText = isButtonStateShow(buttonState)
    ? states.hide
    : states.show;
};

const getFirstElementOrDefault = (elm, querySelector) => {
  const elms = elm.querySelectorAll(querySelector);
  return elms ? elms[0] : null;
};

const getButtonState = buttonElms =>
  buttonElms &&
  buttonElms[0].innerText.toLowerCase() === states.hide.toLowerCase()
    ? states.hide
    : states.show;

const getOppositeButtonState = buttonText =>
  buttonText.toLowerCase() === states.show.toLowerCase()
    ? states.hide
    : states.show;

const setButtonState = (elm, state) => {
  elm.innerText = state;
};

const isButtonStateShow = buttonText =>
  buttonText.toLowerCase() === states.show.toLowerCase();

/**
 * Adjust the details section for a given step list, based on it's state
 * @param {*} stepListElm
 */
const updateSections = (stepListElm, targetButtonState) => {
  const stepListSections = stepListElm.querySelectorAll("li");
  stepListSections.forEach(sectionElm => {
    const toggleBtnElm = getFirstElementOrDefault(
      sectionElm,
      `.${cssClasses.detailsToggleButton}`
    );
    const detailElms = sectionElm.querySelectorAll(`.${cssClasses.details}`);
    const buttonState = targetButtonState || toggleBtnElm.innerText;

    detailElms.forEach(elm => {
      displaySectionDetails(elm, getOppositeButtonState(buttonState));
    });

    setButtonState(toggleBtnElm, buttonState);
  });
};

// Events

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);
/**
 * Ensure we capture all events
 * https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
 */
document.addEventListener(
  "click",
  function(clickEvent) {
    // If the clicked element doesn't have the right selector, bail
    if (!clickEvent.target.matches(`.${cssClasses.detailsToggleButton}`)) {
      return;
    } else {
      handleDetailsToggleButtonClick(clickEvent);
    }
  },
  false
);
