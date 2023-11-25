import { getTimeString } from '../Utilities/getTimeString';

/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } ClockConfigProperties
 * @property { boolean } [showSeconds] Whether to show seconds or not
 *
 * @typedef { BaseWidgetConfig & ClockConfigProperties } Config
 */

/**
 * @param { HTMLElement } clockElem
 * @param { boolean } showSeconds
 */
export function setTime(clockElem, showSeconds) {
  clockElem.innerText = getTimeString(showSeconds);

  // Round to the start of next minute
  const updateInMs = showSeconds ? 1000 : (60 - new Date().getSeconds()) * 1000;
  setTimeout(function () {
    setTime(clockElem, showSeconds);
  }, updateInMs);
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  const { showSeconds } = config;

  const clockElem = document.createElement('div');
  clockElem.className += ' clock centered widget';
  setTime(clockElem, showSeconds ?? false);

  return {
    returnElem: clockElem,
    minWidth: showSeconds ? 179 : 133,
    minHeight: 21,
    // TODO:
    // 1. Remove existing listener
    // 2. Fix type doc for config
    // updateFn: (config) => {
    //   setTime(clockElem, config.showSeconds ?? false);
    // },
  };
}

export const Clock = {
  create: createWidget,
};
