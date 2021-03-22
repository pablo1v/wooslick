const { join, resolve } = require('path');

const RENDERER_PATH = resolve(__dirname, '..', 'renderer');

/**
 * @param {...string} paths
 */
function makeRendererPath(...paths) {
  return join(RENDERER_PATH, ...paths);
}

module.exports = {
  makeRendererPath,
};
