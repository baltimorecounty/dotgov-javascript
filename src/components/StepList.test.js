import { getByText, getAllByText } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { createAppContainer, resetAppContainer } from "../utilities/test.utils";
import { default as GetStepListFixture } from "./StepList.fixture";
import StepList from "./StepList"; /** Despite not being used anywhere, this is required to load */

/**
 * Helper to check if a button contains the text "show"
 * Uses the parent element button element, because react testing library find by text returns the direct element match
 * Example: getAllByText(document, /Step [0-9]:/i); selects the span contained inside the button
 * @param {*} stepButtonElm
 */
const hasShowText = stepButtonElm => {
  const { innerHTML: buttonContent = "" } =
    stepButtonElm.closest("button") || stepButtonElm.innerHTML;
  return buttonContent && buttonContent.toLowerCase().indexOf("show") > -1;
};

afterEach(() => {
  /** Reset document.body */
  resetAppContainer(document);
});

test("displays a static on page load", () => {
  createAppContainer(document, GetStepListFixture("static"));

  const stepButtons = getAllByText(document, /Step [0-9]:/i);

  stepButtons.forEach(stepButtonElm => {
    expect(hasShowText(stepButtonElm)).toEqual(true);
  });

  const showAllButton = getByText(document, /show all/i);
  expect(showAllButton).not.toBeVisible();
});

test("displays a dynamic step list on page load with all steps collapsed", () => {
  createAppContainer(document, GetStepListFixture("collapsed"));

  const stepButtons = getAllByText(document, /Step [0-9]:/i);

  stepButtons.forEach(stepButtonElm => {
    expect(hasShowText(stepButtonElm)).toEqual(true);
  });

  const showAllButton = getByText(document, /show all/i);
  expect(showAllButton).toBeVisible();
});

test("displays a dynamic step list on page load with all steps expanded", () => {
  createAppContainer(document, GetStepListFixture(""));

  const stepButtons = getAllByText(document, /Step [0-9]:/i);

  stepButtons.forEach(stepButtonElm => {
    expect(hasShowText(stepButtonElm)).toEqual(false);
  });

  const showAllButton = getByText(document, /hide all/i);
  expect(showAllButton).toBeVisible();
});

test("should toggle details when an section toggle button is selected", () => {
  createAppContainer(document, GetStepListFixture("collapsed"));

  const step1Button = getByText(document, /Step 1:/i);

  /** Expand the details */
  step1Button.click();

  const stepDetails = getByText(
    document,
    /Step 1 details/i
  ); /** contents of the step 1 details panel */

  expect(stepDetails).toBeVisible();

  /** Collapse the details */
  step1Button.click();

  expect(stepDetails).not.toBeVisible();
});

test("should show all details when the 'Show All' button is selected", () => {
  createAppContainer(document, GetStepListFixture("collapsed"));

  const showAllButton = getByText(document, /Show All/i);

  /** Expand the details */
  showAllButton.click();

  const detailPanels = getAllByText(
    document,
    /Step\s[0-9]\sdetails/i
  ); /** contents of the step 1 details panel */

  detailPanels.forEach(detailPanelElm => {
    expect(detailPanelElm).toBeVisible();
  });

  const hideAllButton = getByText(document, /Hide All/i);
  expect(hideAllButton).toBeVisible();
});

test("should show all details when the 'Hide All' button is selected", () => {
  createAppContainer(document, GetStepListFixture(""));

  const hideAllButton = getByText(document, /Hide All/i);

  /** Expand the details */
  hideAllButton.click();

  const detailPanels = getAllByText(
    document,
    /Step\s[0-9]\sdetails/i
  ); /** contents of the step 1 details panel */

  detailPanels.forEach(detailPanelElm => {
    expect(detailPanelElm).not.toBeVisible();
  });

  const showAllButton = getByText(document, /Show All/i);
  expect(showAllButton).toBeVisible();
});

test("should show 'hide all' button after each individual step has expanded independently", () => {
  createAppContainer(document, GetStepListFixture("collapsed"));

  const stepButtons = getAllByText(document, /Step [0-9]:/i);

  stepButtons.forEach(stepButtonElm => {
    stepButtonElm.click();
  });

  const hideAllButton = getByText(document, /Hide All/i);
  expect(hideAllButton).toBeVisible();
});

test("should show 'show all' button after a single detail is hidden independently given all other panels were expanded", () => {
  createAppContainer(document, GetStepListFixture(""));

  const stepButtons = getAllByText(document, /Step [0-9]:/i);

  /** Doesn't matter which panel is selected, so we will use the first */
  stepButtons[0].click();

  const hideAllButton = getByText(document, /Show All/i);
  expect(hideAllButton).toBeVisible();
});
