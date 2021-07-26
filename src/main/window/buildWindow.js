import { readFileSync } from 'fs';
import { join } from 'path';

import { nativeImage, BrowserWindow } from 'electron';

import { RESOURCES_PATH } from '../../constants/paths';
import { HEADER_HEIGHT } from '../../constants/window';
import { createBrowserView } from './createBrowserView';
import { setInSlot, getFromSlot } from './slot';

const icon = nativeImage.createFromPath(join(RESOURCES_PATH, 'icon.png'));

export async function buildWindow() {
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
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: join(__dirname, 'renderer', 'header', 'preload.js'),
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

  // Listen window resize
  browserWindow.on('resize', () => {
    resizeContent();
  });

  // Load header element
  await header.webContents.loadFile(join(__dirname, 'renderer', 'header.html'));
  await header.webContents.executeJavaScript(
    readFileSync(join(__dirname, 'renderer', 'header', 'start.js'), {
      encoding: 'utf-8',
    }),
  );

  header.webContents.openDevTools({
    mode: 'undocked',
  });

  browserWindow.maximize();
  browserWindow.show();

  resizeContent();

  await content.webContents.loadFile(join(__dirname, 'renderer', 'view.html'));
  content.webContents.openDevTools({ mode: 'right' });
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
