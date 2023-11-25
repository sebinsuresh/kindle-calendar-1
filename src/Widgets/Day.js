import { WeekDays } from '../Constants/Days';
import { getCurrentDate } from '../Utilities/getCurrentDate';
import { getDateString } from '../Utilities/getDateString';

/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef DayConfigProperties
 * @type { object }
 * @property { number } [displayMode] Format to display the day in. Must be one of `DisplayModes`
 *
 * @typedef { BaseWidgetConfig & DayConfigProperties } Config
 */

const DisplayModes = {
  Short: 1, // e.g. "Mon"
  Long: 2, // e.g. "Monday"
};

const defaultConfig = {
  displayMode: DisplayModes.Long,
};

/**
 * @param { HTMLElement } dayElem
 * @param { number } displayMode
 */
function setDay(dayElem, displayMode) {
  // Round to the start of next day
  const now = getCurrentDate();
  const updateInMs =
    24 * 60 * 60 * 1000 - (now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds()) * 1000;

  switch (displayMode) {
    case DisplayModes.Short:
      dayElem.innerText = WeekDays.Short[now.getDay()];
      break;
    case DisplayModes.Long:
    default:
      dayElem.innerText = WeekDays.Long[now.getDay()];
  }

  setTimeout(function () {
    setDay(dayElem, displayMode);
  }, updateInMs);
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  const { displayMode } = { ...defaultConfig, ...config };
  const dateElem = document.createElement('div');
  dateElem.className += ' day widget';
  setDay(dateElem, displayMode);

  return {
    returnElem: dateElem,
    // TODO: Update this
    minWidth: 130,
    minHeight: 21,
    // TODO: Add update function
  };
}

export const DayWidget = {
  create: createWidget,
  DisplayModes,
};
