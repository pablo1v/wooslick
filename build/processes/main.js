const { join } = require('path');

const { build } = require('../build');
const { CHECK_MARK_EMOJI } = require('../constants');
const { mergeOptions } = require('../utils/mergeOptions');

const MAIN_FILE = join('src', 'main', 'main.js');

/**
 * Build main process
 */
async function buildMain() {
  await build(
    mergeOptions({
      entryPoints: [MAIN_FILE],
      outfile: 'dist/main.js',
      bundle: true,
      minify: true,
      watch: true,
    }),
  );

  console.log(`${CHECK_MARK_EMOJI} main process controller was compiled.`);
}

module.exports = {
  buildMain,
};
