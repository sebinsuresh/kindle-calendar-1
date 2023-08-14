import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';

/**
 * @param {HTMLElement} consoleElem
 * @param {unknown} err
 */
function logError(consoleElem, err) {
  const startMessage = '--------------\nError details:\n';
  const endMessage = '--------------\n';

  consoleElem.innerText += startMessage;
  if (!(err instanceof Error)) {
    consoleElem.innerText += '  ' + err?.toString();
    consoleElem.innerText += endMessage;
    return;
  }

  for (const key in err) {
    // On Kindle browser's JS engine, you can do this:
    // @ts-ignore
    const val = err[key];
    consoleElem.innerText += `  ${key}: ${val}\n`;
  }

  consoleElem.innerText += endMessage;
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
    logError(consoleElem, err);
  }
}

document.addEventListener('DOMContentLoaded', handleOnLoad);
