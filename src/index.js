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

  // For each widget, we should maybe specify:
  // - The x position of this widget
  // - The y position of this widget
  // - Number of columns this widget takes up
  // - Number of rows this widget takes up

  appElem.appendChild(Clock.create({}).returnElem);
  appElem.appendChild(DateWidget.create({}).returnElem);
  appElem.appendChild(Resolution.create({}).returnElem);
  appElem.appendChild(Calendar.create({}).returnElem);
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
