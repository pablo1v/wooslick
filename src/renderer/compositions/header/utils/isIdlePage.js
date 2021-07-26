import { VIEW_PAGE_FILE } from '../constants';

const VIEW_PAGE_REGEX = new RegExp(`^file://${VIEW_PAGE_FILE}`);

/**
 * @param {string} url
 */
export function isIdlePage(url) {
  return VIEW_PAGE_REGEX.test(url);
}
