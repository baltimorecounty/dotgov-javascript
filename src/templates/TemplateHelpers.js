/**
 * @param {String} HTML
 * @return {Element}
 */
const compileTemplate = html => {
  // https://stackoverflow.com/a/494348/1143670
  var div = document.createElement("div");
  div.innerHTML = html.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

export { compileTemplate };
