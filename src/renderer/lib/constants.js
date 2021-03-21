const { resolve } = require('path');

const HTML_EMPTY_FILE = resolve(__dirname, '..', 'empty.html');
const HTML_EMPTY_FILE_URL = `file://${HTML_EMPTY_FILE}`;

module.exports = {
  HTML_EMPTY_FILE,
  HTML_EMPTY_FILE_URL,
};
