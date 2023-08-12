import { getCurrentDate } from '../Utilities/getCurrentDate';
import { getDateString } from '../Utilities/getDateString';

/**
 * @param {HTMLElement} dateElem
 * @param {boolean} showUpdateIn
 * */
export function setDate(dateElem, showUpdateIn) {
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

/** @param {HTMLElement} baseElem */
export function createDate(baseElem) {
  const dateElem = document.createElement('div');
  dateElem.className += ' date';
  baseElem.appendChild(dateElem);
  setDate(dateElem, false);
}

export const DateWidget = {
  create: createDate,
};
