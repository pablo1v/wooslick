const { sync: fastGlobSync } = require('fast-glob');

const { FAST_GLOB_BASE_OPTIONS } = require('../constants');

/**
 * @return {string[]}
 * @param {string|string[]} source
 * @param {import('fast-glob').Options} options
 */
function glob(source, options) {
  return fastGlobSync(source, { ...FAST_GLOB_BASE_OPTIONS, ...options });
}

module.exports = {
  glob,
};
