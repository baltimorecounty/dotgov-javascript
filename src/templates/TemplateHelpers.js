/**
 * @param {String} HTML
 * @return {Element}
 */
const compileTemplate = (html) => {
	// https://developer.mozilla.org/en-US/docs/Web/API/range/createContextualFragment
	const range = document.createRange();
	// Make the parent of the first div in the document becomes the context node
	range.selectNode(document.getElementsByTagName('div').item(0));
	return range.createContextualFragment(html);
};

export { compileTemplate };
