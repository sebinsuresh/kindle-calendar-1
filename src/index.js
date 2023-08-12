import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';

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
