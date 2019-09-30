import {
  getByText,
  wait,
  getAllByText,
  queryAllByText
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { createAppContainer, resetAppContainer } from "../utilities/test.utils";
import { default as GetStepListFixture } from "./StepList.fixture";
let stepList;

const triggerDomContentLoaded = () => {
  window.document.dispatchEvent(
    new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    })
  );
};

afterEach(() => {
  /** Reset document.body */
  resetAppContainer(document);

  jest.resetModules();
});

beforeEach(() => {});

describe("step list - page load", () => {
  test("displays a static on page load", () => {
    createAppContainer(document, GetStepListFixture("static"));
    stepList = require("./StepList");
    triggerDomContentLoaded();

    const stepButtons = getAllByText(document, /Step [0-9]:/i);

    console.log(stepButtons);

    const showAllButton = getByText(document, /show all/i);
    expect(showAllButton).not.toBeVisible();
  });

  //   test("displays a step list with all items collapsed on page load by default", () => {
  //     createAppContainer(document, GetStepListFixture("collapsed"));
  //     stepList = require("./StepList");
  //     triggerDomContentLoaded();

  //     const showAllButton = getByText(document, /show all/i);

  //     expect(showAllButton).not.toBeVisible();
  //   });
  // test("displays a step list with all items expanded on page load by default");
});

test("should show details when an section toggle button is selected", async () => {
  createAppContainer(document, GetStepListFixture("collapsed"));
  const step1Button = getByText(document, /Step 1:/i);

  step1Button.click();

  const detailsTest = getByText(
    document,
    /Step 1 details/i
  ); /** contents of the step 1 details panel */

  expect(detailsTest).toBeVisible();
});
