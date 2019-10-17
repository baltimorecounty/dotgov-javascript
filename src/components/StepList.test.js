import {
  getByText,
  wait,
  getAllByText,
  queryAllByText
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { createAppContainer, resetAppContainer } from "../utilities/test.utils";
import { default as GetStepListFixture } from "./StepList.fixture";

const triggerDomContentLoaded = () => {
  window.document.dispatchEvent(
    new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    })
  );
};

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

  jest.resetModules();
});

describe("step list - page load", () => {
  test("displays a static on page load", () => {
    createAppContainer(document, GetStepListFixture("static"));
    require("./StepList");
    triggerDomContentLoaded();

    const stepButtons = getAllByText(document, /Step [0-9]:/i);

    stepButtons.forEach(stepButtonElm => {
      expect(hasShowText(stepButtonElm)).toEqual(true);
    });

    const showAllButton = getByText(document, /show all/i);
    expect(showAllButton).not.toBeVisible();
  });

  test("displays a dynamic step list on page load with all steps collapsed", () => {
    createAppContainer(document, GetStepListFixture("collapsed"));
    require("./StepList");
    triggerDomContentLoaded();

    const stepButtons = getAllByText(document, /Step [0-9]:/i);

    stepButtons.forEach(stepButtonElm => {
      expect(hasShowText(stepButtonElm)).toEqual(true);
    });

    const showAllButton = getByText(document, /show all/i);
    expect(showAllButton).toBeVisible();
  });

  test("displays a dynamic step list on page load with all steps expanded", () => {
    createAppContainer(document, GetStepListFixture(""));
    require("./StepList");
    triggerDomContentLoaded();

    const stepButtons = getAllByText(document, /Step [0-9]:/i);

    stepButtons.forEach(stepButtonElm => {
      expect(hasShowText(stepButtonElm)).toEqual(false);
    });

    const showAllButton = getByText(document, /hide all/i);
    expect(showAllButton).toBeVisible();
  });
});
