const WELCOME_FILE_URL_REGEX = /^file:\/\/.*welcome\.html$/;

/**
 * @param {string} url
 */
function isInWelcomeURL(url) {
  return WELCOME_FILE_URL_REGEX.test(url);
}

module.exports = {
  isInWelcomeURL,
};
