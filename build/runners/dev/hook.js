const { app, BrowserWindow } = require('electron');

const { ChildProcessMessageType } = require('./type');

function quit() {
  app.quit();
}

function reload() {
  const allWindows = BrowserWindow.getAllWindows();

  allWindows.forEach(window => {
    const browserViews = window.getBrowserViews();

    window.webContents.reloadIgnoringCache();

    browserViews.forEach(browserView => {
      browserView.webContents.reloadIgnoringCache();
    });
  });
}

process.on('message', message => {
  if (typeof message !== 'object') {
    return;
  }

  const { type } = message;

  if (type === ChildProcessMessageType.Quit) {
    quit();
    return;
  }

  if (type === ChildProcessMessageType.Reload) {
    reload();
  }
});
