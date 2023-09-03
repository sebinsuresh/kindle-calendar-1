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
  const updateInMs = (60 - new Date().getSeconds()) * 1000;
  setTimeout(function () {
    setTime(clockElem, showSeconds);
  }, updateInMs);
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createClock(config) {
  const { showSeconds } = config;

  const clockElem = document.createElement('div');
  clockElem.className += ' clock widget';
  setTime(clockElem, showSeconds ?? false);

  return { returnElem: clockElem };
}

export const Clock = {
  create: createClock,
};
