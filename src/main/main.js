import { app, Menu, BrowserWindow } from 'electron';

import { buildWindow } from './window/buildWindow';
import { prepare } from './window/prepare';

require('@electron/remote/main').initialize();

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
