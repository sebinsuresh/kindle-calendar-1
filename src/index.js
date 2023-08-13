import { Calendar } from './widgets/Calendar';
import { Clock } from './widgets/Clock';
import { DateWidget } from './widgets/Date';

function handleOnLoad() {
  let consoleElem = document.getElementById('consoleElem');
  let appElem = document.getElementById('app');
  if (!consoleElem || !appElem) {
    throw new Error('Could not find Console or App elements in page');
  }
  Clock.create({ baseElem: appElem });
  DateWidget.create(appElem);
  Calendar.create(appElem);
}

document.addEventListener('DOMContentLoaded', handleOnLoad);
