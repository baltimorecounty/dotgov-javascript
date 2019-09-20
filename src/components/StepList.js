const states = {
  collapsed: "collapsed",
  hide: "Hide",
  hideAll: "Hide All",
  show: "Show",
  showAll: "Show All"
};

const cssClasses = {
  collapsed: "collapsed",
  stepList: "dg_step-list",
  detailsToggleButton: "dg_step-list__toggle-btn",
  details: "dg_step-list__details",
  showAllStepsButton: "dg_step-list__show-all-btn"
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

  toggleDetailButtonText(buttonElm, buttonState);

  updateToggleAllButton(detailElms, buttonState);
};

const updateToggleAllButton = (detailElms, buttonState) => {
  const showAllButtonElm = detailElms
    ? getFirstElementOrDefault(
        detailElms[0].closest(`.${cssClasses.stepList}`),
        `.${cssClasses.showAllStepsButton}`
      )
    : null;

  const isAtLeastOneDetailSectionVisible = isButtonStateShow(
    getOppositeButtonState(buttonState)
  );

  if (isHideAllVisible(showAllButtonElm) && isAtLeastOneDetailSectionVisible) {
    setButtonState(showAllButtonElm, states.showAll);
  }
};

const isHideAllVisible = showAllButtonElm =>
  showAllButtonElm &&
  showAllButtonElm.innerText.toLowerCase() === states.hideAll.toLowerCase();

const handleAllStepButtonClick = clickEvent => {
  const buttonElm = clickEvent.target;
  const sectionElm = buttonElm.closest(`.${cssClasses.stepList}`);
  const buttonState = buttonElm.innerText;

  updateSections(sectionElm, getOppositeButtonState(buttonState));
  toggleAllButtonText(buttonElm, buttonState);
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

const toggleAllButtonText = (buttonElm, buttonState) => {
  setButtonState(
    buttonElm,
    isButtonStateShow(buttonState) ? states.hideAll : states.showAll
  );
};

const toggleDetailButtonText = (buttonElm, buttonState) => {
  setButtonState(
    buttonElm,
    isButtonStateShow(buttonState) ? states.hide : states.show
  );
};

const setButtonState = (elm, state) => {
  elm.innerText = state;
};

const getFirstElementOrDefault = (elm, querySelector) => {
  const elms = elm.querySelectorAll(querySelector);
  return elms ? elms[0] : null;
};

const getOppositeButtonState = buttonText =>
  isButtonStateShow(buttonText) ? states.hide : states.show;

const isButtonStateShow = buttonText =>
  buttonText.toLowerCase().indexOf(states.show.toLowerCase()) > -1;

/**
 * Adjust the details section for a given step list, based on it's state
 * @param {*} stepListElm
 */
const updateSections = (stepListElm, newButtonState) => {
  const stepListSections = stepListElm.querySelectorAll("li");
  stepListSections.forEach(sectionElm => {
    const toggleBtnElm = getFirstElementOrDefault(
      sectionElm,
      `.${cssClasses.detailsToggleButton}`
    );
    const detailElms = sectionElm.querySelectorAll(`.${cssClasses.details}`);
    const buttonState = newButtonState || toggleBtnElm.innerText;

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
  clickEvent => {
    const { target } = clickEvent;
    // If the clicked element doesn't have the right selector, bail
    if (target.matches(`.${cssClasses.detailsToggleButton}`)) {
      handleDetailsToggleButtonClick(clickEvent);
    } else if (target.matches(`.${cssClasses.showAllStepsButton}`)) {
      handleAllStepButtonClick(clickEvent);
    } else {
      return;
    }
  },
  false
);
