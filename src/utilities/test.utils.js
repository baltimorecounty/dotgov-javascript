/**
 * Create a container for your integration tests that includes the required markup.
 * @param {string} html html as a string
 */
const createAppContainer = (document, html) => {
  document.body.innerHTML = html;
};

/**
 * Resets app container, useful when running multiple tests
 */
const resetAppContainer = document => document.body.firstChild.remove();

export { createAppContainer, resetAppContainer };
