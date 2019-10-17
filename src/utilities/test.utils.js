/**
 * Manually triggers DomContentLoaded event
 * @param {*} document document provided by jsdom in your test
 */
const triggerDomContentLoaded = document => {
  document.dispatchEvent(
    new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    })
  );
};

/**
 * Create a container for your integration tests that includes the required markup.
 * @param {*} document document provided by jsdom in your test
 * @param {string} html html as a string
 */
const createAppContainer = (document, html) => {
  document.body.innerHTML = html;
  triggerDomContentLoaded(document);
};

/**
 * Resets app container, useful when running multiple tests
 */
const resetAppContainer = document => document.body.firstChild.remove();

export { createAppContainer, resetAppContainer, triggerDomContentLoaded };
