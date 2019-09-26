import {
  getByText,
  wait,
  getAllByText,
  findAllByText
} from "@testing-library/dom";
import { toBeVisible } from "@testing-library/jest-dom/extend-expect";
import { createAppContainer, resetAppContainer } from "../utilities/test.utils";
import { default as StepListFixture } from "./StepList.fixture";
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

beforeEach(() => {
  createAppContainer(document, StepListFixture);
  stepList = require("./StepList");
  triggerDomContentLoaded();
});

test("should show details when an section toggle button is selected", async () => {
  const step1Button = getByText(document, /Step 1:/i);

  step1Button.click();

  const detailsTest = getByText(
    document,
    /Step 1 details/i
  ); /** contents of the step 1 details panel */

  expect(detailsTest).toBeVisible();
});
