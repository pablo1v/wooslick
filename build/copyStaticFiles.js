const { join } = require('path');

const { copySync } = require('fs-extra');

const { ROOT_PATH, CHECK_MARK_EMOJI } = require('./constants');
const { glob } = require('./utils/glob');

const STATIC_FILES_PATH = join('src', 'renderer');
const STATIC_FILES = new Set(
  glob(join(STATIC_FILES_PATH, '(*.html|public/**/*)')),
);

/**
 * Copy static files
 */
function copyStaticFiles() {
  for (const file of STATIC_FILES) {
    const fileName = file.replace(STATIC_FILES_PATH, '');
    const fileSource = join(ROOT_PATH, file);
    const fileDestination = join(ROOT_PATH, 'dist', 'renderer', fileName);

    copySync(fileSource, fileDestination);
  }

  console.log(
    `${CHECK_MARK_EMOJI} ${STATIC_FILES.size} files were copied to static folder.`,
  );
}

module.exports = {
  copyStaticFiles,
};
