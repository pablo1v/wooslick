/**
 * @return {number}
 * @param {number} bytes
 */
function transformBytesInKilobytes(bytes) {
  const kilobytes = (bytes / 1024).toFixed(2);

  return kilobytes;
}

module.exports = {
  transformBytesInKilobytes,
};
