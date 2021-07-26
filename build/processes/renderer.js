const { join } = require('path');

const { existsSync } = require('fs-extra');

const { build } = require('../build');
const { CHECK_MARK_EMOJI } = require('../constants');
const { glob } = require('../utils/glob');
const { mergeOptions } = require('../utils/mergeOptions');

const RENDERER_COMPOSITIONS_PATH = join('src', 'renderer', 'compositions');
const RENDERER_COMPOSITIONS = glob(join(RENDERER_COMPOSITIONS_PATH, '*'), {
  onlyDirectories: true,
});

const COMPOSITION_DIRECTORY_REPLACE_REGEX = new RegExp(
  `${RENDERER_COMPOSITIONS_PATH}/`,
);

/**
 * Run renderer process
 */
async function buildRenderer() {
  for await (const compositionDirectory of RENDERER_COMPOSITIONS) {
    const compositionName = compositionDirectory.replace(
      COMPOSITION_DIRECTORY_REPLACE_REGEX,
      '',
    );
    const compositionOutPath = join('dist', 'renderer', compositionName);

    const startFile = join(compositionDirectory, 'start.js');
    const preloadFile = join(compositionDirectory, 'preload.js');

    if (existsSync(startFile)) {
      await build(
        mergeOptions({
          entryPoints: [startFile],
          outfile: join(compositionOutPath, 'start.js'),
          bundle: true,
          minify: true,
        }),
      );
    }

    if (existsSync(preloadFile)) {
      await build(
        mergeOptions({
          entryPoints: [preloadFile],
          outfile: join(compositionOutPath, 'preload.js'),
          bundle: true,
          minify: true,
        }),
      );
    }

    console.log(
      `${CHECK_MARK_EMOJI} ${compositionName} composition was compiled.`,
    );
  }
}

module.exports = {
  buildRenderer,
};
