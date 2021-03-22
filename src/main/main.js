require('@electron/remote/main').initialize();

const { app, Menu, BrowserWindow } = require('electron');

const { buildWindow } = require('./window/buildWindow');
const { prepare } = require('./window/prepare');

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

async function createWindow() {
  Menu.setApplicationMenu(null);

  await prepare();
  buildWindow();
}
