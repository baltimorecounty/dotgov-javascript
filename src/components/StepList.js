import "../polyfills/array-from.polyfill";
import "../polyfills/closest.polyfill";
import "../polyfills/nodelist-foreach.polyfill";

import { GetFirstElementOrDefault } from "../utilities/dom.utilities";

const states = {
  collapsed: "collapsed",
  hide: "Hide",
  hideAll: "Hide All",
  show: "Show",
  showAll: "Show All",
  static: "static"
};

const cssClasses = {
  collapsed: "collapsed",
  hovered: "is-hovered",
  stepList: "dg_step-list",
  detailsToggleButton: "dg_step-list__toggle-btn",
  details: "dg_step-list__details",
  showAllStepsButton: "dg_step-list__show-all-btn",
  toggleButtonHeading: "dg_step-list__toggle-btn__title",
  toggleButtonText: "dg_step-list__toggle-btn__btn-text",
  section: "dg_step-list__list-section"
};

/**
 * Add hover events for each list item for a given step list
 * @param {*} stepListElm
 */
const addStepListHoverEvents = stepListElm => {
  const stepListItemElms = stepListElm.querySelectorAll(
    `.${cssClasses.section}`
  );

  /** Add hover events for individual step list items, to make styling the step circles easier. */
  stepListItemElms.forEach(stepListItemElm => {
    const itemButtonElm = GetFirstElementOrDefault(
      stepListItemElm,
      `.${cssClasses.detailsToggleButton}`
    );
    itemButtonElm.addEventListener("mouseenter", mouseenterEvent => {
      toggleItemHoverStatus(mouseenterEvent, true);
    });
    itemButtonElm.addEventListener("mouseleave", mouseleaveEvent => {
      toggleItemHoverStatus(mouseleaveEvent, false);
    });
  });
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
 * @param {string} buttonText  buttonElm.textContent, will be "Show" or "Hide"
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
  Array.from(
    stepListElm.querySelectorAll(`.${cssClasses.detailsToggleButton}`)
  ).filter(
    elm => elm.textContent.toLowerCase().indexOf(states.show.toLowerCase()) > -1
  ).length > 0;

/**
 * Handle "Show All" Button Click based on a Step List
 * @param {Object} clickEvent
 * @return {void}
 */
const handleAllStepButtonClick = clickEvent => {
  const buttonElm = clickEvent.target;
  const sectionElm = buttonElm.closest(`.${cssClasses.stepList}`);
  const buttonState = buttonElm.textContent;

  updateSections(sectionElm, getOppositeDetailsToggleButtonState(buttonState));
  toggleAllButtonText(buttonElm, buttonState);
};

/**
 * Handle the details button toggle click for a given step list section detail button
 * @param {object} clickEvent
 */
const handleDetailsToggleButtonClick = clickEvent => {
  const { target } = clickEvent;

  const buttonElm = target.classList.contains(cssClasses.toggleBtnElm)
    ? target
    : target.parentElement;
  if (buttonElm.tagName.toLowerCase() === "button") {
    const buttonState = buttonElm.textContent;
    const detailElms = buttonElm
      .closest(`.${cssClasses.section}`)
      .querySelectorAll(`.${cssClasses.details}`);

    Array.from(detailElms).forEach(detailElm => {
      displaySectionDetails(detailElm, buttonState);
    });

    setAriaExpanded(buttonElm, isButtonStateShow(buttonState));
    toggleDetailButtonText(buttonElm, buttonState);
    updateToggleAllButton(detailElms);
  }
};

const handleDocumentClick = clickEvent => {
  const { target } = clickEvent;
  // If the clicked element doesn't have the right selector, bail
  const isDetailsToggleClick =
    target.parentElement.classList.contains(cssClasses.detailsToggleButton) ||
    target.classList.contains(cssClasses.detailsToggleButton);

  if (isDetailsToggleClick) {
    handleDetailsToggleButtonClick(clickEvent);
  } else if (target.classList.contains(cssClasses.showAllStepsButton)) {
    handleAllStepButtonClick(clickEvent);
  } else {
    return;
  }
};

/**
 * Determine if the given button text is equal to "Show" (case insensitive)
 * @param {string} buttonText buttonElm.textContent, will be "Show" or "Hide"
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
  showAllButtonElm.textContent.toLowerCase() === states.hideAll.toLowerCase();

/**
 * Helper to set an elements text
 * @param {*} elm
 * @param {string} text desired text for element
 */
const setElementText = (elm, text) => {
  elm.textContent = text;
};

/**
 * Set aria expanded based on isExpanded flag
 * @param {HTMLElement} elm
 * @param {boolean} isExpanded
 */
const setAriaExpanded = (elm, isExpanded) => {
  elm.setAttribute("aria-expanded", isExpanded);
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
  const buttonTextElm = buttonElm.querySelectorAll(
    `.${cssClasses.toggleButtonText}`
  );
  const elmToUpdate = buttonTextElm ? buttonTextElm[0] : null;

  if (!elmToUpdate) {
    console.error(
      "Something is wrong with your markup, please verify your step is setup properly"
    );
    return;
  }

  setElementText(
    elmToUpdate,
    isButtonStateShow(buttonState) ? states.hide : states.show
  );
};

/**
 * Adds or removed the hovered class to a step list item based on the isHovered param
 * @param {*} elm
 * @param {boolean} isHovered whether or not the given element is being hovered
 */
const toggleItemHoverStatus = (event, isHovered) => {
  const detailsButtonElm = event.target.closest(`.${cssClasses.section}`);
  detailsButtonElm.classList[isHovered ? "add" : "remove"](cssClasses.hovered);
};

/**
 * Adjust the details section for a given step list, based on it's state
 * @param {HTMLElement} stepListElm
 */
const updateSections = (stepListElm, newButtonState) => {
  const stepListSections = stepListElm.querySelectorAll(
    `.${cssClasses.section}`
  );
  Array.from(stepListSections).forEach(sectionElm => {
    const toggleBtnElm = GetFirstElementOrDefault(
      sectionElm,
      `.${cssClasses.detailsToggleButton}`
    );
    const toggleButtonTextElm = GetFirstElementOrDefault(
      toggleBtnElm,
      `.${cssClasses.toggleButtonText}`
    );
    const detailElms = sectionElm.querySelectorAll(`.${cssClasses.details}`);
    const buttonState = newButtonState || toggleBtnElm.textContent;
    setAriaExpanded(toggleBtnElm, !isButtonStateShow(buttonState));

    Array.from(detailElms).forEach(elm => {
      displaySectionDetails(
        elm,
        getOppositeDetailsToggleButtonState(buttonState)
      );
    });

    setElementText(toggleButtonTextElm, buttonState);
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
  const showAllButtonElm = GetFirstElementOrDefault(
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

/**
 * Scripts to run after the page has loaded for this file
 */
const onDocumentReady = () => {
  // Get All Accordions
  const stepListElms = document.querySelectorAll(`.${cssClasses.stepList}`);

  // Check the state of each accordion
  Array.from(stepListElms).forEach(stepListElm => {
    const isDefaultStateStatic = stepListElm.classList.contains(states.static);

    if (isDefaultStateStatic) {
      return;
    }

    /**
     * Ensure we capture all events
     * https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
     */
    document.addEventListener("click", handleDocumentClick, false);

    addStepListHoverEvents(stepListElm);

    const isDefaultStateCollapsed = stepListElm.classList.contains(
      states.collapsed
    );

    if (!isDefaultStateCollapsed) {
      const toggleAllButtonElm = GetFirstElementOrDefault(
        stepListElm,
        `.${cssClasses.showAllStepsButton}`
      );
      toggleAllButtonText(toggleAllButtonElm, states.show);
    }

    updateSections(
      stepListElm,
      isDefaultStateCollapsed ? states.show : states.hide
    );
  });
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);
