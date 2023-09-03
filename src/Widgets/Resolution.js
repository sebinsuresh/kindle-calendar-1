/**
 * @typedef { import('./Types/BaseWidgetConfig').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } ResolutionConfigProperties
 * @property { boolean } [showRefreshButton] Whether to show a refresh button
 *
 * @typedef { BaseWidgetConfig & ResolutionConfigProperties } Config
 */

/** @param {HTMLDivElement} widgetElem */
function setContent(widgetElem) {
  let spanElem = widgetElem.querySelector('span');
  if (!spanElem) {
    spanElem = document.createElement('span');
    widgetElem.appendChild(spanElem);
  }
  spanElem.innerText = `${window.innerWidth} x ${window.innerHeight}`;
}

/** @param {HTMLDivElement} widgetElem */
function createRefreshButton(widgetElem) {
  const refreshButton = document.createElement('button');
  refreshButton.innerText = '↻';
  refreshButton.addEventListener('click', () => setContent(widgetElem));
  return refreshButton;
}

/** @param { Config } config */
function createWidget(config) {
  const { baseElem } = config;

  const widgetElem = document.createElement('div');
  widgetElem.className += ' resolution widget';
  setContent(widgetElem);

  if (config.showRefreshButton ?? true) {
    const refreshButton = createRefreshButton(widgetElem);
    widgetElem.appendChild(refreshButton);
  }

  baseElem.appendChild(widgetElem);
}

export const Resolution = {
  create: createWidget,
};
