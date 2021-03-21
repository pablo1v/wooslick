const { app } = require('electron');

const { APP_NAME } = require('../constants');

async function prepare() {
  app.setName(APP_NAME);
}

module.exports = {
  prepare,
};
