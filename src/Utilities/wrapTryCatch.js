import { logError } from './logError';

/**
 * Returns a function that wraps the given function in a try-catch block.
 * @param {() => any} fn
 * @returns {() => void}
 */
export function wrapTryCatch(fn) {
  return function () {
    try {
      fn();
    } catch (err) {
      logError(err);
    }
  };
}
