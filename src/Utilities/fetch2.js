import { ajax } from './ajax';
import { logMessage } from './logMessage';

/**
 * @typedef { import('./ajax').AjaxResponse } AjaxResponse
 *
 * @typedef { (callback: (errorResponse: AjaxResponse) => void) => void } ErrorCallback
 * @typedef { (callback: (response: AjaxResponse) => void) => { error: ErrorCallback } } ThenCallback
 *
 * @typedef { Object } Fetch2Return Return value of `fetch2` function
 * @property { ThenCallback } then Callback for successful request
 * @property { ErrorCallback } error Callback for failed request
 */

/**
 * @param { string } url
 * @param { string } httpMethod
 * @param { string } [body]
 * @returns { Fetch2Return }
 */
export function fetch2(url, httpMethod, body) {
  /** @type { ((response: AjaxResponse) => void) | null } */
  let successCallback = null;

  /** @type { ((errorResponse: AjaxResponse) => void) | null } */
  let failCallback = null;

  /** @param { (errorResponse: AjaxResponse) => void } callback */
  function catchFn(callback) {
    failCallback = callback;
  }

  /** @param { (response: AjaxResponse) => void } callback */
  function thenFn(callback) {
    successCallback = callback;
    return {
      error: catchFn,
    };
  }

  function ajaxSuccess(/** @type { AjaxResponse } */ _response) {
    successCallback && successCallback(_response);
  }

  function ajaxFail(/** @type { AjaxResponse} */ _errResponse) {
    failCallback && failCallback(_errResponse);
  }

  ajax({
    url,
    method: httpMethod,
    data: body,
    success: ajaxSuccess,
    fail: ajaxFail,
  });

  return {
    then: thenFn,
    error: catchFn,
  };
}

export function exampleUsage() {
  const testDelay = 1;

  // Non HTTPS endpoint that works on Kindle.
  // See API specs: http://eu.httpbin.org/
  const testUrl1 = `http://eu.httpbin.org/delay/${testDelay}`;

  // HTTPS endpoint that does not work on Kindle.
  const testUrl2 = `https://jsonplaceholder.typicode.com/posts/1`;

  fetch2(testUrl1, 'GET')
    .then((response) => {
      logMessage('success');
      logMessage(response.status.toString());
      logMessage(response.response);
    })
    .error((error) => {
      logMessage('Error');
      logMessage(error.status.toString());
      logMessage(error.response);
    });
}
