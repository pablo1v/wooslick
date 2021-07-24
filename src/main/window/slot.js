/**
 * @typedef SlotKeyType
 * @type {'window' | 'header' | 'content'}
 */

/**
 * @type {Map<SlotKeyType, any>}
 */
const PRIVATE_SLOT = new Map();

export function getPrivateSlot() {
  return PRIVATE_SLOT;
}

/**
 * @param {SlotKeyType} key
 */
export function getFromSlot(key) {
  return PRIVATE_SLOT.get(key);
}

/**
 * @param {SlotKeyType} key
 * @param {any} value
 */
export function setInSlot(key, value) {
  PRIVATE_SLOT.set(key, value);
}
