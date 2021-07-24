import { join } from 'path';

import { nativeImage, BrowserWindow } from 'electron';

import { RESOURCES_PATH } from '../../constants/paths';
import { createBrowserView } from './createBrowserView';
import { setInSlot, getFromSlot } from './slot';

const HEADER_HEIGHT = 44;

const icon = nativeImage.createFromPath(join(RESOURCES_PATH, 'icon.png'));

export function buildWindow() {
  const browserWindow = new BrowserWindow({
    icon,
    show: false,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
    },
  });

  setInSlot('window', browserWindow);

  const header = createBrowserView('header', {
    bounds: {
      height: HEADER_HEIGHT,
    },
    webPreferences: {
      enableRemoteModule: true,
      preload: HEADER_PRELOAD_WEBPACK_ENTRY,
    },
  });

  const content = createBrowserView('content', {
    fullResizable: true,
    bounds: {
      y: HEADER_HEIGHT,
    },
  });

  setInSlot('header', header);
  setInSlot('content', content);

  browserWindow.addBrowserView(header);
  browserWindow.addBrowserView(content);

  // Load header element
  header.webContents.loadURL(HEADER_WEBPACK_ENTRY).then(() => {
    browserWindow.maximize();
    browserWindow.show();

    resizeContent();

    header.webContents.openDevTools({
      mode: 'undocked',
    });

    setImmediate(() => {
      content.webContents.loadURL(VIEW_WEBPACK_ENTRY).then(() => {
        content.webContents.openDevTools({
          mode: 'right',
        });
      });
    });
  });

  // Listen window resize
  browserWindow.on('resize', () => {
    resizeContent();
  });
}

// https://github.com/electron/electron/issues/13468#issuecomment-503358188
function resizeContent() {
  /**
   * @type {BrowserWindow}
   */
  const browserWindow = getFromSlot('window');
  /**
   * @type {ReturnType<createBrowserView>}
   */
  const header = getFromSlot('header');
  /**
   * @type {ReturnType<createBrowserView>}
   */
  const content = getFromSlot('content');

  const headerInterval = setInterval(() => {
    const [currentWitdh] = browserWindow.getSize();

    header.setBounds({
      x: 0,
      y: 0,
      width: currentWitdh,
      height: HEADER_HEIGHT,
    });

    const headerBounds = header.getBounds();

    if (
      headerBounds.width === currentWitdh &&
      headerBounds.height === HEADER_HEIGHT
    ) {
      clearInterval(headerInterval);
    }
  }, 500);

  const contentInterval = setInterval(() => {
    const [currentWitdh, currentHeight] = browserWindow.getSize();
    const heightReducedWithHeaderheight = currentHeight - HEADER_HEIGHT;

    content.setBounds({
      x: 0,
      y: HEADER_HEIGHT,
      width: currentWitdh,
      height: heightReducedWithHeaderheight,
    });

    const contentBounds = content.getBounds();

    if (
      contentBounds.width === currentWitdh &&
      contentBounds.height === heightReducedWithHeaderheight
    ) {
      clearInterval(contentInterval);
    }
  }, 500);
}
