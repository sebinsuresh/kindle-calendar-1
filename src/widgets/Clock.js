import { getTimeString } from '../Utilities/getTimeString';

/**
 * @typedef {Object} Config
 * @property {HTMLElement} baseElem The element to append the clock to
 * @property {boolean} [showSeconds] Whether to show seconds or not
 * */

/**
 * @param {HTMLElement} clockElem
 * @param {boolean} showSeconds
 * */
export function setTime(clockElem, showSeconds) {
  clockElem.innerText = getTimeString(showSeconds);

  // Round to the start of next minute
  const updateInMs = (60 - new Date().getSeconds()) * 1000;
  setTimeout(function () {
    setTime(clockElem, showSeconds);
  }, updateInMs);
}

/** @param {Config} config */
export function createClock(config) {
  const { baseElem, showSeconds } = config;

  const clockElem = document.createElement('div');
  clockElem.className += ' clock';
  setTime(clockElem, showSeconds ?? false);

  baseElem.appendChild(clockElem);
}

export const Clock = {
  create: createClock,
};
