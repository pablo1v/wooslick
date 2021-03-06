import { ElementManager } from '../managers/ElementManager';
import { Page } from './Page';
import { Take } from './Take';

const URL_REGEX = /^(https|http):\/\/[^\s$.?#].[^\s]*$/;

export class Form extends Take {
  load() {
    const form = ElementManager.get('form');

    form.addEventListener('submit', this.#listener.bind(this));
  }

  /**
   * @private
   * @param {Event} event
   */
  #listener(event) {
    event.preventDefault();

    /**
     * @type {Page}
     */
    const page = Page.get();

    const input = ElementManager.get('input');
    const url = input.value;

    if (!URL_REGEX.test(url)) {
      return;
    }

    page.render(url);
  }
}
