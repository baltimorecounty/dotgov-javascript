import A11yDialog from "a11y-dialog";

/**
 *
 * @param {string} dialogId
 * @param {string} contentId
 * @param {function} onShow
 */
const init = (dialogId, contentId, onShow = () => {}) => {
  const dialog = document.getElementById(dialogId);
  const content = document.getElementById(contentId);
  const modal = new A11yDialog(dialog, content);

  modal.on("show", onShow);

  return modal;
};

export { init };
