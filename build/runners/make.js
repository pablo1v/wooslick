const { copyStaticFiles } = require('../copyStaticFiles');
const { logBuildInfo } = require('../logBuildInfo');
const { buildMain } = require('../processes/main');
const { buildRenderer } = require('../processes/renderer');

async function make() {
  await buildMain();
  await buildRenderer();

  copyStaticFiles();

  logBuildInfo();
}

make();
