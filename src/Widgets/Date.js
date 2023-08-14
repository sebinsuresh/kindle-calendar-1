import { getCurrentDate } from '../Utilities/getCurrentDate';
import { getDateString } from '../Utilities/getDateString';

/**
 * @typedef { import('./Types/BaseWidgetConfig').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef DateConfigProperties
 * @type {object}
 * @property {boolean} [showUpdateIn] Show the time until the next update (in hours)
 *
 * @typedef { BaseWidgetConfig & DateConfigProperties } Config
 * */

/**
 * @param {HTMLElement} dateElem
 * @param {boolean} showUpdateIn
 * */
function setDate(dateElem, showUpdateIn) {
  dateElem.innerText = getDateString();

  // Round to the start of next day
  const now = getCurrentDate();
  const updateInMs =
    24 * 60 * 60 * 1000 - (now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds()) * 1000;

  if (showUpdateIn) {
    const updateInHours = (updateInMs / 1000 / 60 / 60).toFixed(2);
    dateElem.innerText += ` (Update in: ${updateInHours} hrs.)`;
  }
  setTimeout(function () {
    setDate(dateElem, showUpdateIn);
  }, updateInMs);
}

/** @param {Config} config */
export function createDate(config) {
  const { baseElem, showUpdateIn } = config;

  const dateElem = document.createElement('div');
  dateElem.className += ' date';
  setDate(dateElem, showUpdateIn ?? false);

  baseElem.appendChild(dateElem);
}

export const DateWidget = {
  create: createDate,
};