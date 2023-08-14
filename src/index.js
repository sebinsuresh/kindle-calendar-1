import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';

/**
 * @param {HTMLElement} consoleElem
 * @param {Error} err
 */
function logError(consoleElem, err) {
  consoleElem.innerText += '--------------\nError details:\n';
  consoleElem.innerText += err.toString();
  for (const key in err) {
    // TODO: Avoid ignoring this error
    // @ts-ignore
    consoleElem.innerText += `${key}: ${err[key]}\n`;
  }
  consoleElem.innerText += '--------------\n';
}

function handleOnLoad() {
  const consoleElem = document.getElementById('consoleElem');
  if (!consoleElem) {
    throw new Error('Could not find Console element in page');
  }

  try {
    let appElem = document.getElementById('app');
    if (!appElem) {
      throw new Error('Could not find app element in page');
    }

    Clock.create({ baseElem: appElem });
    DateWidget.create({ baseElem: appElem });
    Calendar.create({ baseElem: appElem });
  } catch (err) {
    // TODO: Avoid ignoring this error
    // @ts-ignore
    logError(consoleElem, err);
  }
}

document.addEventListener('DOMContentLoaded', handleOnLoad);
