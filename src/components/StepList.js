import { GetFirstElementOrDefault } from "../utilities/dom.utils";

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

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
  const buttonElm = clickEvent.target;
  const buttonState = buttonElm.textContent;
  console.log(buttonState);
  const detailElms = buttonElm
    .closest("li")
    .querySelectorAll(`.${cssClasses.details}`);

  Array.from(detailElms).forEach(detailElm => {
    displaySectionDetails(detailElm, buttonState);
  });

  toggleDetailButtonText(buttonElm, buttonState);

  updateToggleAllButton(detailElms);
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
  Array.from(stepListSections).forEach(sectionElm => {
    const toggleBtnElm = GetFirstElementOrDefault(
      sectionElm,
      `.${cssClasses.detailsToggleButton}`
    );
    const detailElms = sectionElm.querySelectorAll(`.${cssClasses.details}`);
    const buttonState = newButtonState || toggleBtnElm.textContent;

    Array.from(detailElms).forEach(elm => {
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
    const isDefaultStateCollapsed = stepListElm.classList.contains(
      states.collapsed
    );

    if (isDefaultStateCollapsed) {
      updateSections(stepListElm, states.show);
    }
  });

  if (onComplete && typeof onComplete === "function") {
    onComplete();
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
    if (target.classList.contains(cssClasses.detailsToggleButton)) {
      handleDetailsToggleButtonClick(clickEvent);
    } else if (target.classList.contains(cssClasses.showAllStepsButton)) {
      handleAllStepButtonClick(clickEvent);
    } else {
      return;
    }
  },
  false
);
