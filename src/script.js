import { Calendar } from './widgets/Calendar';
import { Clock } from './widgets/Clock';
import { DateWidget } from './widgets/Date';

/** @type {HTMLElement} */
let appElem;
/** @type {HTMLElement} */
let consoleElem;

function handleOnLoad() {
  consoleElem = document.getElementById('consoleElem');
  appElem = document.getElementById('app');
  Clock.create(appElem);
  DateWidget.create(appElem);
  Calendar.create(appElem);
}

document.addEventListener('DOMContentLoaded', handleOnLoad);
