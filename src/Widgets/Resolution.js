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

/** @param { HTMLDivElement } widgetElem */
function setContent(widgetElem) {
  let spanElem = widgetElem.querySelector('span');
  if (!spanElem) {
    spanElem = document.createElement('span');
    widgetElem.appendChild(spanElem);
  }
  spanElem.innerText = `${window.innerWidth} x ${window.innerHeight}`;
}

/** @param { HTMLDivElement } widgetElem */
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
export function createWidget(config) {
  const { showRefreshButton } = { ...defaultConfig, ...config };

  const widgetElem = document.createElement('div');
  widgetElem.className += ' resolution centered widget';
  const containerElem = document.createElement('div');
  setContent(containerElem);
  widgetElem.appendChild(containerElem);

  if (showRefreshButton) {
    const refreshButton = createRefreshButton(containerElem);
    containerElem.appendChild(refreshButton);
  }

  return {
    returnElem: widgetElem,
    minWidth: showRefreshButton ? 105 : 71,
    minHeight: showRefreshButton ? 30 : 21,
    // TODO: Add update function
  };
}

export const Resolution = {
  create: createWidget,
};
