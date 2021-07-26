const { copyStaticFiles } = require('../copyStaticFiles');
const { logBuildInfo } = require('../logBuildInfo');
const { buildMain } = require('../processes/main');
const { buildRenderer } = require('../processes/renderer');

// Implement child process
async function start() {
  await buildMain();
  await buildRenderer();

  copyStaticFiles();

  logBuildInfo();
}

start();
