/**
 * ChildNode.after() polyfill
 * Adapted from https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/after()/after().md
 * @author Chris Ferdinandi
 * @license MIT
 */
(function (elem) {

	// Check if element is a node
	// https://github.com/Financial-Times/polyfill-service
	var isNode = function (object) {

		// DOM, Level2
		if (typeof Node === 'function') {
			return object instanceof Node;
		}

		// Older browsers, check if it looks like a Node instance)
		return object &&
			typeof object === "object" &&
			object.nodeName &&
			object.nodeType >= 1 &&
			object.nodeType <= 12;

	};

	// Add after() method to prototype
	for (var i = 0; i < elem.length; i++) {
		if (!window[elem[i]] || 'after' in window[elem[i]].prototype) continue;
		window[elem[i]].prototype.after = function () {
			var argArr = Array.prototype.slice.call(arguments);
			var docFrag = document.createDocumentFragment();

			for (var n = 0; n < argArr.length; n++) {
				docFrag.appendChild(isNode(argArr[n]) ? argArr[n] : document.createTextNode(String(argArr[n])));
			}

			this.parentNode.insertBefore(docFrag, this.nextSibling);
		};
	}

})(['Element', 'CharacterData', 'DocumentType']);