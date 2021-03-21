/**
 * @typedef ElementNamesType
 * @type {keyof typeof ELEMENT_NAMES_OBJECT}
 */

const ELEMENT_NAMES_OBJECT = {
  form: '#page-form',
  input: '#page-form > input',
  header: '#page-header',
  buttons: '#page-header .buttons',
};

const ELEMENT_NAMES_MAP = Object.keys(ELEMENT_NAMES_OBJECT);

class ElementManager {
  /**
   * @type {Map<string, HTMLElement>}
   */
  static #store = new Map();

  /**
   * @param {ElementNamesType} name
   * @returns {HTMLElement}
   */
  static get(name) {
    if (!ELEMENT_NAMES_MAP.includes(name)) {
      throw new Error('The inserted element is invalid.');
    }

    return this.#getOrAdd(name);
  }

  /**
   *
   * @param {ElementNamesType} name
   * @param {HTMLElement} element
   */
  static add(name, element) {
    if (this.#store.has(name)) {
      this.#store.delete(name);
    }

    this.#store.set(name, element);
    this.#registerMutationObserver(name, element);

    return element;
  }

  /**
   * @private
   * @param {ElementNamesType} name
   */
  static #getOrAdd(name) {
    if (this.#store.has(name)) {
      return this.#store.get(name);
    }

    /**
     * @type {string}
     */
    const pickedName = ELEMENT_NAMES_OBJECT[name];
    const element = document.querySelector(pickedName);

    if (!element) {
      return null;
    }

    return this.add(name, element);
  }

  /**
   * @param {ElementNamesType} name
   * @param {HTMLElement} element
   */
  static #registerMutationObserver(name, element) {
    const mutationObserver = new MutationObserver(
      (event, currentMutationObserver) => {
        const childListMutationRecord = event.find(
          ({ type }) => type === 'childList',
        );

        if (
          !childListMutationRecord ||
          !Array.from(childListMutationRecord.removedNodes).includes(element)
        ) {
          return;
        }

        this.#store.delete(name);
        currentMutationObserver.disconnect();
      },
    );

    function observe() {
      mutationObserver.observe(element.parentNode, {
        childList: true,
      });
    }

    const hasElementInDOM = () =>
      element.isConnected && document.body.contains(element);

    if (hasElementInDOM()) {
      observe();
      return;
    }

    if (!hasElementInDOM()) {
      const checkInterval = setInterval(() => {
        if (hasElementInDOM()) {
          observe();
          clearInterval(checkInterval);
        }
      }, 500);
    }
  }
}

module.exports = {
  ElementManager,
};
