import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';

function handleOnLoad() {
  let consoleElem = document.getElementById('consoleElem');
  let appElem = document.getElementById('app');
  if (!consoleElem || !appElem) {
    throw new Error('Could not find Console or App elements in page');
  }
  Clock.create({ baseElem: appElem });
  DateWidget.create({ baseElem: appElem });
  Calendar.create({ baseElem: appElem });
}

document.addEventListener('DOMContentLoaded', handleOnLoad);
