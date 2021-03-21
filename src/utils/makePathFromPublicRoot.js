const { PUBLIC_PATH } = require('../constants');
const { join } = require('path');

/**
 * @param {...string} paths
 */
function makePathFromPublicRoot(...paths) {
  return join(PUBLIC_PATH, ...paths);
}

module.exports = {
  makePathFromPublicRoot,
};
