import { getTimeString } from '../Utilities/getTimeString';

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

/** @param {HTMLElement} baseElem */
export function createClock(baseElem) {
  const clockElem = document.createElement('div');
  clockElem.className += ' clock';
  baseElem.appendChild(clockElem);
  setTime(clockElem, false);
}

export const Clock = {
  create: createClock,
};
