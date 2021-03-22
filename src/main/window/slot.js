/**
 * @typedef SlotKeyType
 * @type {'window' | 'header' | 'content'}
 */

/**
 * @type {Map<SlotKeyType, any>}
 */
const PRIVATE_SLOT = new Map();

function getPrivateSlot() {
  return PRIVATE_SLOT;
}

/**
 * @param {SlotKeyType} key
 */
function getFromSlot(key) {
  return PRIVATE_SLOT.get(key);
}

/**
 * @param {SlotKeyType} key
 * @param {any} value
 */
function setInSlot(key, value) {
  PRIVATE_SLOT.set(key, value);
}

module.exports = {
  setInSlot,
  getFromSlot,
  getPrivateSlot,
};
