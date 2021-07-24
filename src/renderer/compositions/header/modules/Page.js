import { AppName } from '../../../../../config/app';
import { ElementManager } from '../managers/ElementManager';
import { isInIdlePage } from '../utils/isInIdlePage';
import { Take } from './Take';

export class Page extends Take {
  load() {
    this.#listenPageChange();
  }

  /**
   * @param {string} url
   */
  render(url) {
    const contentWebContents = window.manager.getViewWebContents('content');

    if (contentWebContents.isLoading()) {
      contentWebContents.stop();
    }

    contentWebContents.loadURL(url).catch(() => {
      // noop
    });
  }

  #listenPageChange() {
    const contentWebContents = window.manager.getViewWebContents('content');
    const input = ElementManager.get('input');

    function updateTitle() {
      let url = contentWebContents.getURL();
      let title = contentWebContents.getTitle();

      if (isInIdlePage(url)) {
        url = '';
        title = AppName;
      }

      input.value = url;
      window.manager.setWindowTitle(title);
    }

    window.manager.addViewWebContentsListener(
      'content',
      'did-navigate',
      updateTitle,
    );
    window.manager.addViewWebContentsListener(
      'content',
      'did-stop-loading',
      updateTitle,
    );
    window.manager.addViewWebContentsListener(
      'content',
      'page-title-updated',
      updateTitle,
    );
  }
}
