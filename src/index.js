import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { Resolution } from './Widgets/Resolution';

function handleOnLoad() {
  const appElem = document.getElementById('app');
  if (!appElem) {
    throw new Error('Could not find app element in page');
  }

  appElem.appendChild(Clock.create({}).returnElem);
  appElem.appendChild(DateWidget.create({}).returnElem);
  appElem.appendChild(Resolution.create({}).returnElem);
  appElem.appendChild(Calendar.create({}).returnElem);
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
