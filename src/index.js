import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { wrapTryCatch } from './Utilities/wrapTryCatch';

function handleOnLoad() {
  let appElem = document.getElementById('app');
  if (!appElem) {
    throw new Error('Could not find app element in page');
  }

  Clock.create({ baseElem: appElem });
  DateWidget.create({ baseElem: appElem });
  Calendar.create({ baseElem: appElem });
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
