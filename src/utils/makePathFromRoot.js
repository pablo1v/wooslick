const { ROOT_PATH } = require('../constants');
const { join } = require('path');

/**
 * @param {...string} paths
 */
function makePathFromRoot(...paths) {
  return join(ROOT_PATH, ...paths);
}

module.exports = {
  makePathFromRoot,
};
