const { resolve } = require('path');

const { dependencies, devDependencies } = require('../package.json');

const IS_DEV = process.env.NODE_ENV !== 'production';

const CHECK_MARK_EMOJI = '✅';

const ROOT_PATH = resolve(__dirname, '..');

// Options

/**
 * @type {import('fast-glob').Options}
 */
const FAST_GLOB_BASE_OPTIONS = {
  cwd: ROOT_PATH,
};

const APP_EXTERNAL_PACKAGES = [dependencies, devDependencies]
  .map(Object.keys)
  .flatMap(group => group);

/**
 * @type {import('esbuild').BuildOptions}
 */
const ESBUILD_BASE_OPTIONS = {
  format: 'cjs',
  target: 'es2015',
  platform: 'node',
  absWorkingDir: ROOT_PATH,
  metafile: true,
  external: [...APP_EXTERNAL_PACKAGES],
  sourcemap: IS_DEV,
};

module.exports = {
  IS_DEV,
  CHECK_MARK_EMOJI,

  ROOT_PATH,

  ESBUILD_BASE_OPTIONS,
  FAST_GLOB_BASE_OPTIONS,
};
