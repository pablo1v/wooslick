const { HTML_EMPTY_FILE_URL } = require('../constants');
const { ElementManager } = require('../managers/ElementManager');
const { WindowManager } = require('../managers/WindowManager');
const { isInEmptyURL } = require('../utils/isInEmptyURL');
const { Take } = require('./Take');

const CANCEL_ICON_PATH = 'public/img/cancel.svg';
const REFRESH_ICON_PATH = 'public/img/refresh.svg';

class Buttons extends Take {
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
    const contentWebContents = WindowManager.getView('content').webContents;

    contentWebContents.addListener('did-start-navigation', (_event, url) => {
      if (url) {
        this.#pageURLStore.set(this.#pageURLStore.size, url);
        contentWebContents.emit('received-navigation');
      }
    });
  }

  #registerNext() {
    const nextButton = this.#getButton('next');
    const contentWebContents = WindowManager.getView('content').webContents;

    nextButton.setAttribute('disabled', true);

    nextButton.addEventListener('click', () => {
      if (contentWebContents.canGoForward()) {
        contentWebContents.goForward();
        return;
      }

      if (isInEmptyURL(contentWebContents.getURL())) {
        contentWebContents.goToIndex(0);
        return;
      }

      nextButton.setAttribute('disabled', true);
    });

    /* */

    const handleLoadEffects = (force = false) => {
      if (force && isInEmptyURL(this.lastPageURL)) {
        nextButton.setAttribute('disabled', true);
        return;
      }

      if (
        isInEmptyURL(contentWebContents.getURL()) ||
        (contentWebContents.canGoForward() && !isInEmptyURL(this.lastPageURL))
      ) {
        nextButton.removeAttribute('disabled');
        return;
      }

      nextButton.setAttribute('disabled', true);
    };

    contentWebContents.addListener('did-stop-loading', handleLoadEffects);
    contentWebContents.addListener('received-navigation', () => {
      handleLoadEffects(true);
    });
  }

  #registerPrevious() {
    const previousButton = this.#getButton('previous');
    const contentWebContents = WindowManager.getView('content').webContents;

    previousButton.setAttribute('disabled', true);

    previousButton.addEventListener('click', () => {
      if (contentWebContents.canGoBack()) {
        contentWebContents.goBack();
        return;
      }

      previousButton.setAttribute('disabled', true);
      contentWebContents.loadURL(HTML_EMPTY_FILE_URL).catch(() => {
        // noop
      });
    });

    /* */

    contentWebContents.addListener('did-start-loading', () => {
      previousButton.removeAttribute('disabled');
    });

    contentWebContents.addListener('did-stop-loading', () => {
      if (isInEmptyURL(contentWebContents.getURL())) {
        previousButton.setAttribute('disabled', true);
      }
    });
  }

  #registerRefresh() {
    const refreshButton = this.#getButton('refresh');
    const contentWebContents = WindowManager.getView('content').webContents;

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
      if (refreshButton.classList.contains('refreshing')) {
        contentWebContents.stop();
        return;
      }

      contentWebContents.reload();
    });

    /* */

    contentWebContents.addListener('did-stop-loading', () => {
      refreshButton.classList.remove('refreshing');
    });

    contentWebContents.addListener('did-start-loading', () => {
      refreshButton.classList.add('refreshing');
    });
  }
}

module.exports = {
  Buttons,
};
