/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } ResolutionConfigProperties
 * @property { boolean } [showRefreshButton] Whether to show a refresh button
 *
 * @typedef { BaseWidgetConfig & ResolutionConfigProperties } Config
 */

const defaultConfig = {
  showRefreshButton: true,
};

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

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
function createWidget(config) {
  const { showRefreshButton } = { ...defaultConfig, ...config };

  const widgetElem = document.createElement('div');
  widgetElem.className += ' resolution widget';
  setContent(widgetElem);

  if (showRefreshButton) {
    const refreshButton = createRefreshButton(widgetElem);
    widgetElem.appendChild(refreshButton);
  }

  return { returnElem: widgetElem };
}

export const Resolution = {
  create: createWidget,
};
