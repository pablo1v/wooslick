import { BrowserView } from 'electron';

const DEFAULT_AUTO_RESIZE_OPTIONS = { width: true };
const DEFAULT_BOUNDS_OPTIONS = { x: 0, y: 0, width: 0, height: 0 };

/**
 * @typedef CustomBrowserView
 * @type {{
 *  name: string
 * }}
 */

/**
 * @param {string} name
 * @param {{
 *  fullResizable?: boolean
 *  bounds?: Partial<Electron.Rectangle>;
 *  webPreferences?: Electron.WebPreferences
 * }} options
 * @returns {BrowserView & CustomBrowserView}
 */
export function createBrowserView(name, options = {}) {
  const { fullResizable, bounds, webPreferences = {} } = options;
  const autoResizeOptions = {};

  const browserWindow = new BrowserView({ webPreferences });

  if (fullResizable) {
    Object.assign(autoResizeOptions, {
      height: true,
      vertical: true,
      horizontal: true,
    });
  }

  browserWindow.name = name;

  browserWindow.setAutoResize({
    ...DEFAULT_AUTO_RESIZE_OPTIONS,
    ...autoResizeOptions,
  });

  browserWindow.setBounds({
    ...DEFAULT_BOUNDS_OPTIONS,
    ...bounds,
  });

  return browserWindow;
}
