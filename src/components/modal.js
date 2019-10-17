import A11yDialog from "a11y-dialog";

/**
 *@param {string } modalClass
 * @param {string} contentId
 * @param {function} onShow
 */
const modalElms = document.querySelectorAll(`[class*=${"g_modal"}]`);
document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Dom Fully loaded");
    console.log(modalElms);
    const modalClass = "dg_modal";
    //const init = (g_modal, onShow = () => {}) => {
    modalElms.forEach(modalElm => {
      const dialog = modalElm;
      const modal = new A11yDialog(dialog);
      modal.on("show");
    });
    // };
  },
  false
);
