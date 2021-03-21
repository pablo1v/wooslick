const { getCurrentWindow } = require('@electron/remote');

class WindowManager {
  static get currentWindow() {
    return getCurrentWindow();
  }

  /**
   * @param {string} name
   */
  static getView(name) {
    const currentWindow = getCurrentWindow();
    const views = currentWindow.getBrowserViews();

    return views.find(({ name: viewName }) => viewName === name);
  }
}

module.exports = {
  WindowManager,
};
