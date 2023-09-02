/**
 * @typedef { Object } AjaxResponse Response from AJAX request
 * @property { number } status HTTP Status Code
 * @property { string } response Response body string
 *
 * @typedef { { [x: string]: string | number | boolean; } } QueryParams
 *
 * @typedef { Object } AjaxOptions
 * @property { string} [url] HTTP Request URL
 * @property { string } [method] HTTP Request Method
 * @property { string } [data] HTTP Request Body
 * @property { QueryParams } [params] HTTP Request Query Params
 * @property { (response: AjaxResponse) => void } [success] Callback for successful request
 * @property { (response: AjaxResponse) => void } [fail] Callback for failed request
 * @property { string } [dataType] HTTP Request Content-Type
 */

/**
 * Format query params for the request.
 *
 * From https://github.com/WeideMo/miniAjax/
 * @param { QueryParams } data
 */
function formatQueryParams(data) {
  const arr = [];
  for (const name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }
  return arr.join('&');
}

/**
 * Make an AJAX request.
 *
 * From https://github.com/WeideMo/miniAjax/
 * @param { AjaxOptions } options
 */
export function ajax(options) {
  options = options || {};
  options.method = (options.method || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  const params = formatQueryParams(options.params || {});

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      const status = xhr.status;
      const response = { status, response: xhr.responseText };
      if (status >= 200 && status < 300) {
        options.success && options.success(response);
      } else {
        options.fail && options.fail(response);
      }
    }
  };

  const newUrl = options.url + '?' + params;
  if (options.method == 'GET') {
    xhr.open('GET', newUrl, true);
    xhr.send(null);
  } else {
    xhr.open(options.method, newUrl, true);
    xhr.setRequestHeader('Content-Type', `application/${options.dataType}`);
    xhr.send(options.data);
  }
}
