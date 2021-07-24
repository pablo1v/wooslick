import { VIEW_PAGE_URL } from '../constants';

const VIEW_PAGE_REGEX = new RegExp(`^${VIEW_PAGE_URL}`);

/**
 * @param {string} url
 */
export function isInIdlePage(url) {
  return VIEW_PAGE_REGEX.test(url);
}
