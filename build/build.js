const { build: esbuild } = require('esbuild');

/**
 * @type {Map<string, import('esbuild').Metafile['outputs'][number]>}
 */
const filesMetaCache = new Map();

/**
 * @return {Promise<void>}
 * @param {Parameters<import('esbuild').build>[0]} options
 */
async function build(options) {
  const buildResult = await esbuild(options);

  handleBuildResult(buildResult);
}

/**
 * @param {import('esbuild').BuildResult} buildResult
 */
function handleBuildResult(buildResult) {
  const { metafile } = buildResult;

  if (metafile) {
    Object.entries(metafile.outputs).forEach(([file, meta]) => {
      filesMetaCache.set(file, meta);
    });
  }
}

module.exports = {
  filesMetaCache,
  build,
  handleBuildResult,
};
