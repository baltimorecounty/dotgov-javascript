import { GetFirstElementOrDefault } from "../utilities/dom.utilities";

const GenerateCheckboxes = () => {
  document.querySelectorAll(".seCheckbox").forEach(function (inputElm) {
    inputElm.closest("div").classList.add("dg_checkbox");
  });
};

const GenerateRadioButtons = () => {
  document.querySelectorAll(".seRadio").forEach(function (inputElm) {
    inputElm.closest("div").classList.add("dg_radio");
  });
};

/**
 * Moves Checkbox fields (Ex Disclaimer)so that they are styled like other se form elements.
 */
const MoveCheckboxes = () => {
  var horizontalCheckBoxElms = document.querySelectorAll(
    ".SEAFGroupHorizontal"
  );

  [...horizontalCheckBoxElms].forEach((elm) => {
    const fieldContainerElm = GetFirstElementOrDefault(
      elm,
      ".seFieldCellHorizontal"
    );
    const labelContainerElm = GetFirstElementOrDefault(
      elm,
      ".seLabelCellHorizontal"
    );
    const shouldBeMoved = fieldContainerElm && labelContainerElm;

    if (shouldBeMoved) {
      //   fieldContainerElm.closest("div").classList.add("dg_checkbox");
      const labelElm = GetFirstElementOrDefault(labelContainerElm, "label");

      labelElm.classList.add("seCheckboxLabel");

      fieldContainerElm.appendChild(labelElm);
    }
  });
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", () => {
  GenerateCheckboxes();
  GenerateRadioButtons();
  MoveCheckboxes();
});
