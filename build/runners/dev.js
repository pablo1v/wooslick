const { bold } = require('chalk');
const { watch } = require('chokidar');

const { ROOT_PATH } = require('../constants');
const { copyStaticFiles } = require('../copyStaticFiles');
const { logBuildInfo } = require('../logBuildInfo');
const { buildMain } = require('../processes/main');
const { buildRenderer } = require('../processes/renderer');
const { clearConsole } = require('../utils/clearConsole');
const { glob } = require('../utils/glob');
const { wait } = require('../utils/wait');
const { ChildProcess } = require('./dev/ChildProcess');

const MAIN_FILES_REGEX = /^src\/main\/.+/;
const RENDERER_FILES_REGEX = /^src\/renderer\/.+/;
const STATIC_FILES_REGEX = /^src\/renderer\/(public\/.+|([\w.-]+)\.html$)/;

async function dev() {
  clearConsole();

  await buildMain();
  await buildRenderer();

  copyStaticFiles();

  await wait(3000);

  startElectronProcess();
  startWatch();
}

function startWatch() {
  const watcher = watch(glob('src/**/*', { onlyFiles: true }), {
    cwd: ROOT_PATH,
  });

  watcher.on('change', onChange);
}

function startElectronProcess() {
  clearConsole();
  console.log(bold('Starting electron process...'));

  const childProcess = ChildProcess.get();

  childProcess.start('./dist/main.js');
}

/**
 * @param {string} path
 */
async function onChange(path) {
  clearConsole();
  console.log(bold('Rebuilding application...'));

  const hard = await new Promise(async resolve => {
    if (MAIN_FILES_REGEX.test(path)) {
      await buildMain();

      resolve(true);
      return;
    }

    if (STATIC_FILES_REGEX.test(path)) {
      copyStaticFiles();

      resolve();
      return;
    }

    if (RENDERER_FILES_REGEX.test(path)) {
      await buildRenderer();
    }

    resolve();
  });

  clearConsole();
  logBuildInfo();

  const childProcess = ChildProcess.get();

  childProcess.reload(hard);
}

dev();

/* 
  eslint 
  no-async-promise-executor: off
*/
