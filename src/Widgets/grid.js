/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } GridConfigProperties
 * @property { number } [rows] The number of rows in the grid
 * @property { number } [columns] The number of columns in the grid
 * @property { boolean } [showHalfCells] Whether to show half cells
 *
 * @typedef { BaseWidgetConfig & GridConfigProperties } Config
 */

const defaultConfig = {
  rows: 6,
  columns: 6,
  showHalfCells: false,
};

/**
 * @param { HTMLTableElement } gridElem
 * @param { number } rows
 * @param { number } columns
 */
function setContent(gridElem, rows, columns) {
  for (let i = 0; i < rows; i += 1) {
    const row = gridElem.insertRow();
    for (let j = 0; j < columns; j += 1) {
      const cell = row.insertCell();
      cell.innerHTML = '&nbsp;';
    }
  }
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  let { rows, columns } = { ...defaultConfig, ...config };

  const widgetElem = document.createElement('div');
  widgetElem.className += ' grid widget';

  const gridElem = document.createElement('table');
  if (config.showHalfCells) {
    rows *= 2;
    columns *= 2;
  }
  setContent(gridElem, rows, columns);
  widgetElem.appendChild(gridElem);

  return {
    returnElem: widgetElem,
    // TODO: Decide whether to use screen res
    minWidth: 800,
    minHeight: 506,
  };
}

export const Grid = {
  create: createWidget,
};
