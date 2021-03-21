const { HTML_EMPTY_FILE_URL } = require('../constants');

/**
 * @param {string} url
 */
function isInEmptyURL(url) {
  return url === HTML_EMPTY_FILE_URL;
}

module.exports = {
  isInEmptyURL,
};
