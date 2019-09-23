import {
  getByText,
  wait,
  getAllByText,
  findAllByText
} from "@testing-library/dom";
import { createAppContainer, resetAppContainer } from "../utilities/test.utils";
import { default as StepListFixture } from "./StepList.fixture";
let stepList;

jest.autoMockOff();

afterEach(() => {
  /** Reset document.body */
  resetAppContainer(document);

  jest.resetModules();
});

beforeEach(() => {
  createAppContainer(document, StepListFixture);
  stepList = require("./StepList");
});

test("should show details when an section toggle button is selected", async () => {
  const stepListContainer = document.getElementsByClassName("dg_step-list")[0];
  const showButtons = await findAllByText(stepListContainer, "Show");
  const firstSectionToggleButton = showButtons[0];
  const firstSection = firstSectionToggleButton.closest("li");

  firstSectionToggleButton.click();

  const details = firstSection.querySelectorAll(".dg_step-list__details")[0];
  const isDetailsSectionVisible = details.style.display === "block";

  expect(isDetailsSectionVisible).toEqual(true);
  expect(firstSectionToggleButton.textContent).toEqual("Hide");
});

test("should show all details when the 'Show All' button is selected", async () => {
  const stepListContainer = document.getElementsByClassName("dg_step-list")[0];
  const showAllButton = getByText(stepListContainer, "Show All");

  console.log(showAllButton.textContent);

  showAllButton.click();

  //   const hideButtons = await findAllByText(stepListContainer, "Hide");

  //   console.log(document.body.innerHTML);

  //   expect(hideButtons.length).toEqual(14);
});
