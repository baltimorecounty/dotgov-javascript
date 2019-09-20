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

/**
 * Display or Hide Details for a given section of the step list based on the button state (show/hide)
 * @param {HTMLElement} detailsSectionElm
 * @return {void}
 */
const displaySectionDetails = (detailsSectionElm, buttonState) => {
  detailsSectionElm.style.display = isButtonStateShow(buttonState)
    ? "block"
    : "none";
};

/**
 *
 * @param {string} buttonText  buttonElm.innerText, will be "Show" or "Hide"
 * @returns {string} "Show" if the button text is equal to "Hide" or vice-versa
 */
const getOppositeDetailsToggleButtonState = buttonText =>
  isButtonStateShow(buttonText) ? states.hide : states.show;

/**
 * Determine if a step list has at least one section open
 * @param {HTMLElement} stepListElm
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
 * @param {Object} clickEvent
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
 * Handle the details button toggle click for a given step list section detail button
 * @param {object} clickEvent
 */
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

  updateToggleAllButton(detailElms);
};

/**
 * Determine if the given button text is equal to "Show" (case insensitive)
 * @param {string} buttonText buttonElm.innerText, will be "Show" or "Hide"
 * @returns {boolean} true if the button text is "Show" (case insensitive)
 */
const isButtonStateShow = buttonText =>
  buttonText.toLowerCase().indexOf(states.show.toLowerCase()) > -1;

/**
 * Determine if the show all button's active text is "Hide All"
 * @param {HTMLElement} showAllButtonElm
 * @returns {boolean} true if the show all button's text is set to "hide all"
 */
const isHideAllVisible = showAllButtonElm =>
  showAllButtonElm &&
  showAllButtonElm.innerText.toLowerCase() === states.hideAll.toLowerCase();

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
 * Helper to set an elements text
 * @param {*} elm
 * @param {string} text desired text for element
 */
const setElementText = (elm, text) => {
  elm.innerText = text;
};

/**
 * Toggles all toggle button text for a given button state
 * @param {HTMLElement} buttonElm
 * @param {string} buttonState representation of the button state as a string
 * @return {void} if button state is "Show All" then the button text will be "Hide All" or vice-versa
 */
const toggleAllButtonText = (buttonElm, buttonState) => {
  setElementText(
    buttonElm,
    isButtonStateShow(buttonState) ? states.hideAll : states.showAll
  );
};

/**
 * Toggles detail toggle button text for a given button state
 * @param {HTMLElement} buttonElm
 * @param {string} buttonState representation of the button state as a string
 * @return {void} if button state is "Show" then the button text will be "Hide" or vice-versa
 */
const toggleDetailButtonText = (buttonElm, buttonState) => {
  setElementText(buttonElm, getOppositeDetailsToggleButtonState(buttonState));
};

/**
 * Adjust the details section for a given step list, based on it's state
 * @param {HTMLElement} stepListElm
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

    setElementText(toggleBtnElm, buttonState);
  });
};

/**
 * Manages the visible state of the toggle button based on a given details section
 * @param {NodeList} detailElms
 */
const updateToggleAllButton = detailElms => {
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
    setElementText(showAllButtonElm, states.showAll);
  }

  if (!isAtLeastOneSectionDetailVisible) {
    setElementText(showAllButtonElm, states.hideAll);
  }
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
