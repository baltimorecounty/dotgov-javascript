import A11yDialog from "a11y-dialog";

/**
 *@param {string } modalClass
 * @param {string} contentId
 * @param {function} onShow
 */

const init = (modalClass, onShow = () => {}) => {
  const modalElms = document.querySelectorAll(`[class*=${modalClass}]`);
  modalElms.forEach(modalElm => {
    const dialog = modalElm;
    const modal = new A11yDialog(dialog);
    modal.on("show", onShow);
  });
};

export { init };
