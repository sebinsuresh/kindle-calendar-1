import { getConsoleElem } from './getConsoleElem';

/**
 * Logs the given message to the element with ID 'consoleElem'.
 * @param { string } msg
 */
export function logMessage(msg) {
  const consoleElem = getConsoleElem();
  consoleElem.innerText += msg + '\n';
  // For regular browsers:
  console.log(msg);
}
