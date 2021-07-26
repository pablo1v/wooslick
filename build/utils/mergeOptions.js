const { ESBUILD_BASE_OPTIONS } = require('../constants');

/**
 * @return {import('esbuild').BuildOptions}
 * @param {import('esbuild').BuildOptions[]} allOptions
 */
function mergeOptions(...allOptions) {
  return allOptions.reduce(
    (currentOptions, options) => ({ ...currentOptions, ...options }),
    {
      ...ESBUILD_BASE_OPTIONS,
    },
  );
}

module.exports = {
  mergeOptions,
};
