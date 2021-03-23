const { resolve } = require('path');

const HTML_WELCOME_FILE = resolve(__dirname, '..', 'welcome.html');
const HTML_WELCOME_FILE_URL = `file://${HTML_WELCOME_FILE}`;

module.exports = {
  HTML_WELCOME_FILE,
  HTML_WELCOME_FILE_URL,
};
