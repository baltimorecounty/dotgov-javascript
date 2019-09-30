/**
 * Set a specific attribute on a group of elements
 * @param {NodeList} elms collection of nodes, usually from document.querySelectorAll
 * @param {string} attributeName name of the attribute
 * @param {*} attributeValue attribute value
 */
const SetAttribute = (elms, attributeName, attributeValue) => {
  elms.forEach(elm => {
    elm.setAttribute(attributeName, attributeValue);
  });
};

/**
 * Add Css Classes for a group of elements
 * @param {NodeList} elms collection of nodes, usually from document.querySelectorAll
 * @param {string} cssClass space separated string of css classes
 */
const AddClass = (elms, cssClass) => {
  elms.forEach(elm => {
    elm.classList.add(cssClass);
  });
};

/**
 * Remove Css Classes for a group of elements
 * @param {NodeList} elms collection of nodes, usually from document.querySelectorAll
 * @param {string} cssClass space separated string of css classes
 */
const RemoveClass = (elms, cssClass) => {
  elms.forEach(elm => {
    elm.classList.remove(cssClass);
  });
};

/**
 * Toggle Css Classes for a group of elements
 * @param {NodeList} elms collection of nodes, usually from document.querySelectorAll
 * @param {string} cssClass space separated string of css classes
 */
const ToggleClass = (elms, cssClass) => {
  elms.forEach(elm => {
    elm.classList.toggle(cssClass);
  });
};

export { AddClass, RemoveClass, SetAttribute, ToggleClass };
