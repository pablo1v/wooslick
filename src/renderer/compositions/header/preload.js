import { resolve } from 'path';

import * as remote from '@electron/remote';
import { contextBridge } from 'electron';

export const manager = {
  getViewPageFile: () => resolve(__dirname, '..', 'view.html'),
  setWindowTitle: title => {
    remote.getCurrentWindow().setTitle(title);
  },
  getCurrentWindow: () => remote.getCurrentWindow(),
  getBrowserViews: () => remote.getCurrentWindow().getBrowserViews(),
  getView: viewName => {
    const views = remote.getCurrentWindow().getBrowserViews();

    return views.find(({ name }) => name === viewName);
  },
  getViewWebContents: viewName => {
    const views = remote.getCurrentWindow().getBrowserViews();

    return views.find(({ name }) => name === viewName)?.webContents;
  },
  addViewWebContentsListener: (viewName, listenerName, listener) => {
    const views = remote.getCurrentWindow().getBrowserViews();

    views
      .find(({ name }) => name === viewName)
      ?.webContents.addListener(listenerName, listener);
  },
  emitViewWebContentsListener: (viewName, listernerName, ...listenerArgs) => {
    const views = remote.getCurrentWindow().getBrowserViews();

    views
      .find(({ name }) => name === viewName)
      ?.webContents.emit(listernerName, ...listenerArgs);
  },
};

contextBridge.exposeInMainWorld('manager', manager);
