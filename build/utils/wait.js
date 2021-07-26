/**
 * @return {Promise<void>}
 * @param {number} time
 */
async function wait(time) {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

module.exports = {
  wait,
};
