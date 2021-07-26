const { bold } = require('chalk');

const { getBuildInfo } = require('./getBuildInfo');

function logBuildInfo() {
  console.log();
  console.log(bold('Build Info:'));
  console.log();
  console.log(getBuildInfo());
  console.log();
}

module.exports = {
  logBuildInfo,
};
