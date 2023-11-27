/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } PageRefreshConfigProperties
 *
 * @typedef { BaseWidgetConfig & PageRefreshConfigProperties } Config
 */

const defaultConfig = {};

/** @param { HTMLDivElement } widgetElem */
function setContent(widgetElem) {
  const containerElem = document.createElement('div');

  const refreshButton = createRefreshButton();
  containerElem.appendChild(refreshButton);

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = false;
  checkBox.id = `page-refresh-checkbox-${~~(Math.random() * 100)}`;
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      // TODO: Add event listener to refresh on click anywhere
    } else {
      // TODO: Remove event listener
    }
  });
  containerElem.appendChild(checkBox);

  const labelElem = document.createElement('label');
  labelElem.innerText = 'Click anywhere to refresh';
  labelElem.htmlFor = checkBox.id;
  containerElem.appendChild(labelElem);

  widgetElem.appendChild(containerElem);
}

function createRefreshButton() {
  const refreshButton = document.createElement('button');
  refreshButton.innerText = '↻';
  refreshButton.addEventListener('click', () => location.reload());
  // TODO: Figure out how to make the checkbox state persist on refresh
  return refreshButton;
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  const widgetElem = document.createElement('div');
  widgetElem.className += ' page-refresh centered widget';
  setContent(widgetElem);

  return {
    returnElem: widgetElem,
    // TODO: Update these
    minWidth: 105,
    minHeight: 30,
    // TODO: Add update function
  };
}

export const PageRefresh = {
  create: createWidget,
};
