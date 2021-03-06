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

  if(horizontalCheckBoxElms && horizontalCheckBoxElms.length > 0){
    [...horizontalCheckBoxElms].forEach((elm) => {
      const fieldContainerElm = GetFirstElementOrDefault(
        elm,
        ".seFieldCellHorizontal"
      );
      const nextSiblingElm = fieldContainerElm.nextElementSibling;
      const shouldBeMoved =
        fieldContainerElm &&
        nextSiblingElm.classList.contains("seLabelCellHorizontal");
  
      if (shouldBeMoved) {
        const labelElm = GetFirstElementOrDefault(nextSiblingElm, "label");
  
        labelElm.classList.add("seCheckboxLabel");
  
        fieldContainerElm.appendChild(labelElm);
      }
    });
  }

};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", () => {
  GenerateCheckboxes();
  GenerateRadioButtons();
  MoveCheckboxes();
});
