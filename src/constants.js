const { resolve } = require('path');

const APP_NAME = 'HiBrowser';

const ROOT_PATH = resolve(__dirname, '.');

const PUBLIC_PATH = resolve(__dirname, '..', 'public');

module.exports = {
  APP_NAME,
  ROOT_PATH,
  PUBLIC_PATH,
};
