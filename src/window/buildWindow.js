const { nativeImage, BrowserWindow } = require('electron');

const { makePathFromPublicRoot } = require('../utils/makePathFromPublicRoot');
const { createBrowserView } = require('./createBrowserView');
const { setInSlot, getFromSlot } = require('./slot');
const { join, resolve } = require('path');

const image = nativeImage.createFromPath(makePathFromPublicRoot('icon.png'));

const HEADER_HEIGHT = 44;

function buildWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    icon: image,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
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
      preload: resolve(__dirname, '..', 'renderer', 'lib', 'preload.js'),
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
  header.webContents
    .loadFile(resolve(__dirname, '..', 'renderer', 'header.html'))
    .then(() => {
      browserWindow.maximize();
      browserWindow.show();

      resizeContent();

      setImmediate(() => {
        content.webContents
          .loadFile(resolve(__dirname, '..', 'renderer', 'empty.html'))
          .then(() => {
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

module.exports = {
  buildWindow,
};
