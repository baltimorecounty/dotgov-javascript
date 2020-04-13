const GenerateCheckboxes = () => {
  document.querySelectorAll(".seCheckbox").forEach(function(inputElm) {
    inputElm.closest("div").classList.add("dg_checkbox");
  });
};

const GenerateRadioButtons = () => {
  document.querySelectorAll(".seRadio").forEach(function(inputElm) {
    inputElm.closest("div").classList.add("dg_radio");
  });
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", () => {
  GenerateCheckboxes();
  GenerateRadioButtons();
});