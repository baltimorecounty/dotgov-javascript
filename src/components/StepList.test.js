import { getByLabelText, findAllByText, wait } from "@testing-library/dom";
import { createAppContainer, resetAppContainer } from "../utilities/test.utils";
import { default as StepListFixture } from "./StepList.fixture";

afterEach(() => {
  /** Reset document.body */
  resetAppContainer(document);
  jest.resetModules();
});

beforeEach(() => {
  createAppContainer(document, StepListFixture);
  require("./StepList");
});

test("should hide all details on page load", async () => {
  const showButtons = await findAllByText(document, "Show");

  // Since this happens after a full dom load we need to wait to see if the javascript has executed.
  wait(() => {
    expect(showButtons.length).toEqual(3);
  });
});
