import {
  VIEW_PAGE_URL,
  CANCEL_ICON_PATH,
  REFRESH_ICON_PATH,
} from '../constants';
import { ElementManager } from '../managers/ElementManager';
import { isInIdlePage } from '../utils/isInIdlePage';
import { Take } from './Take';

export class Buttons extends Take {
  /**
   * @type {Map<number, string>}
   */
  #pageURLStore = new Map();

  get lastPageURL() {
    return this.#pageURLStore.get(this.#pageURLStore.size - 2);
  }

  load() {
    this.#listenPageChange();

    this.#registerNext();
    this.#registerRefresh();
    this.#registerPrevious();
  }

  /**
   * @param {string} className
   */
  #getButton(className) {
    return ElementManager.get('buttons').querySelector(`.${className}`);
  }

  #listenPageChange() {
    window.manager.addViewWebContentsListener(
      'content',
      'did-start-navigation',
      (_event, url) => {
        if (url) {
          this.#pageURLStore.set(this.#pageURLStore.size, url);
          window.manager.emitViewWebContentsListener(
            'content',
            'received-navigation',
          );
        }
      },
    );
  }

  #registerNext() {
    const nextButton = this.#getButton('next');
    const contentWebContents = window.manager.getViewWebContents('content');

    nextButton.setAttribute('disabled', true);

    nextButton.addEventListener('click', () => {
      if (contentWebContents.canGoForward()) {
        contentWebContents.goForward();
        return;
      }

      if (isInIdlePage(contentWebContents.getURL())) {
        contentWebContents.goToIndex(0);
        return;
      }

      nextButton.setAttribute('disabled', true);
    });

    /* */

    const handleLoadEffects = (force = false) => {
      if (force && isInIdlePage(this.lastPageURL)) {
        nextButton.setAttribute('disabled', true);
        return;
      }

      if (
        isInIdlePage(contentWebContents.getURL()) ||
        (contentWebContents.canGoForward() && !isInIdlePage(this.lastPageURL))
      ) {
        nextButton.removeAttribute('disabled');
        return;
      }

      nextButton.setAttribute('disabled', true);
    };

    window.manager.addViewWebContentsListener(
      'content',
      'did-stop-loading',
      handleLoadEffects,
    );
    window.manager.addViewWebContentsListener(
      'content',
      'received-navigation',
      () => {
        handleLoadEffects(true);
      },
    );
  }

  #registerPrevious() {
    const previousButton = this.#getButton('previous');
    const contentWebContents = window.manager.getViewWebContents('content');

    previousButton.setAttribute('disabled', true);

    previousButton.addEventListener('click', () => {
      if (contentWebContents.canGoBack()) {
        contentWebContents.goBack();
        return;
      }

      previousButton.setAttribute('disabled', true);
      contentWebContents.loadURL(VIEW_PAGE_URL).catch(() => {
        // noop
      });
    });

    /* */

    window.manager.addViewWebContentsListener(
      'content',
      'did-start-loading',
      () => {
        previousButton.removeAttribute('disabled');
      },
    );

    window.manager.addViewWebContentsListener(
      'content',
      'did-stop-loading',
      () => {
        if (isInIdlePage(contentWebContents.getURL())) {
          previousButton.setAttribute('disabled', true);
        }
      },
    );
  }

  #registerRefresh() {
    const refreshButton = this.#getButton('refresh');
    const contentWebContents = window.manager.getViewWebContents('content');

    const mutationObserver = new MutationObserver(event => {
      if (
        !event.some(
          ({ type, attributeName }) =>
            type === 'attributes' && attributeName === 'class',
        )
      ) {
        return;
      }

      const imageElement = refreshButton.querySelector('img');

      if (refreshButton.classList.contains('refreshing')) {
        imageElement.setAttribute('src', CANCEL_ICON_PATH);
        return;
      }

      if (imageElement.getAttribute('src') === REFRESH_ICON_PATH) {
        return;
      }

      imageElement.setAttribute('src', REFRESH_ICON_PATH);
    });

    mutationObserver.observe(refreshButton, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    });

    /* */

    refreshButton.addEventListener('click', () => {
      if (isInIdlePage(contentWebContents.getURL())) {
        return;
      }

      if (refreshButton.classList.contains('refreshing')) {
        contentWebContents.stop();
        return;
      }

      contentWebContents.reload();
    });

    /* */

    window.manager.addViewWebContentsListener(
      'content',
      'did-stop-loading',
      () => {
        refreshButton.classList.remove('refreshing');
      },
    );

    window.manager.addViewWebContentsListener(
      'content',
      'did-start-loading',
      () => {
        refreshButton.classList.add('refreshing');
      },
    );
  }
}
