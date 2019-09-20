import { GetFirstElementOrDefault } from "../utilities/dom.utils";

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

/**
 * Manages the visible state of the toggle button based on a given details section
 * @param {*} detailElms
 * @param {string} buttonState The given details existing button state "Show" or "Hide"
 */
const updateToggleAllButton = (detailElms, buttonState) => {
  if (!detailElms) {
    console.error(
      "There must be a least one details section per step list item."
    );
    return;
  }
  const stepListElm = detailElms[0].closest(`.${cssClasses.stepList}`);
  const showAllButtonElm = getFirstElementOrDefault(
    stepListElm,
    `.${cssClasses.showAllStepsButton}`
  );
  const canHideAll = isHideAllVisible(showAllButtonElm);
  const isAtLeastOneSectionDetailVisible = hasAtLeastOneDetailSectionVisible(
    stepListElm
  );

  if (canHideAll && isAtLeastOneSectionDetailVisible) {
    setButtonState(showAllButtonElm, states.showAll);
  }

  if (!isAtLeastOneSectionDetailVisible) {
    setButtonState(showAllButtonElm, states.hideAll);
  }
};

/**
 * Determine if the show all button's active text is "Hide All"
 * @param {*} showAllButtonElm
 * @returns {boolean} true if the show all button's text is set to "hide all"
 */
const isHideAllVisible = showAllButtonElm =>
  showAllButtonElm &&
  showAllButtonElm.innerText.toLowerCase() === states.hideAll.toLowerCase();

/**
 * Determine if a step list has at least one section open
 * @param {*} stepListElm
 * @returns {boolean} true if the given step list has at least one section open
 */
const hasAtLeastOneDetailSectionVisible = stepListElm =>
  [
    ...stepListElm.querySelectorAll(`.${cssClasses.detailsToggleButton}`)
  ].filter(
    elm => elm.innerText.toLowerCase().indexOf(states.show.toLowerCase()) > -1
  ).length > 0;

/**
 * Handle "Show All" Button Click based on a Step List
 * @param {*} clickEvent
 * @return {void}
 */
const handleAllStepButtonClick = clickEvent => {
  const buttonElm = clickEvent.target;
  const sectionElm = buttonElm.closest(`.${cssClasses.stepList}`);
  const buttonState = buttonElm.innerText;

  updateSections(sectionElm, getOppositeDetailsToggleButtonState(buttonState));
  toggleAllButtonText(buttonElm, buttonState);
};

/**
 * Display or Hide Details for a given section of the step list based on the button state (show/hide)
 * @param {*} detailsSectionElm
 * @return {void}
 */
const displaySectionDetails = (detailsSectionElm, buttonState) => {
  detailsSectionElm.style.display = isButtonStateShow(buttonState)
    ? "block"
    : "none";
};

/**
 * Scripts to run after the page has loaded for this file
 */
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

/**
 *
 * @param {*} buttonElm
 * @param {*} buttonState
 * @return {void}
 */
const toggleAllButtonText = (buttonElm, buttonState) => {
  setButtonState(
    buttonElm,
    isButtonStateShow(buttonState) ? states.hideAll : states.showAll
  );
};

const toggleDetailButtonText = (buttonElm, buttonState) => {
  setButtonState(buttonElm, getOppositeDetailsToggleButtonState(buttonState));
};

const setButtonState = (elm, state) => {
  elm.innerText = state;
};

const getOppositeDetailsToggleButtonState = buttonText =>
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
    const toggleBtnElm = GetFirstElementOrDefault(
      sectionElm,
      `.${cssClasses.detailsToggleButton}`
    );
    const detailElms = sectionElm.querySelectorAll(`.${cssClasses.details}`);
    const buttonState = newButtonState || toggleBtnElm.innerText;

    detailElms.forEach(elm => {
      displaySectionDetails(
        elm,
        getOppositeDetailsToggleButtonState(buttonState)
      );
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
