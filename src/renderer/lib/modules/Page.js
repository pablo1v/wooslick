const { APP_NAME } = require('../../../constants');
const { ElementManager } = require('../managers/ElementManager');
const { WindowManager } = require('../managers/WindowManager');
const { isInWelcomeURL } = require('../utils/isInWelcomeURL');
const { Take } = require('./Take');

class Page extends Take {
  load() {
    this.#listenPageChange();
  }

  /**
   * @param {string} url
   */
  render(url) {
    const contentWebContents = WindowManager.getView('content').webContents;

    if (contentWebContents.isLoading()) {
      contentWebContents.stop();
    }

    contentWebContents.loadURL(url).catch(() => {
      // noop
    });
  }

  #listenPageChange() {
    const contentWebContents = WindowManager.getView('content').webContents;
    const input = ElementManager.get('input');

    function updateTitle() {
      let url = contentWebContents.getURL();
      let title = contentWebContents.getTitle();

      if (isInWelcomeURL(url)) {
        url = '';
        title = APP_NAME;
      }

      input.value = url;
      WindowManager.currentWindow.setTitle(title);
    }

    contentWebContents.addListener('did-navigate', updateTitle);
    contentWebContents.addListener('did-stop-loading', updateTitle);
    contentWebContents.addListener('page-title-updated', updateTitle);
  }
}

module.exports = {
  Page,
};
