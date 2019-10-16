import A11yDialog from "a11y-dialog";

/**
 *@param {string } modalClass
 * @param {string} contentId
 * @param {function} onShow
 */
const init = (modalClass, contentId, onShow = () => {}) => {

  const modalClasses = document.querySelectorAll(`[class*=${modalClass}]`);

  modalClasses.forEach(e => {
    const dialog = document.getElementById(e.id);
    const content = document.getElementById(contentId);
    const modal = new A11yDialog(dialog, content);
    modal.on("show", onShow);

    return modal;
  });

};

export { init };

