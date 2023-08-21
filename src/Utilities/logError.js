import { getConsoleElem } from './getConsoleElem';

/**
 * Logs the given error object to the element with ID 'consoleElem'.
 * @param { unknown } err
 */
export function logError(err) {
  const consoleElem = getConsoleElem();

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
  // For regular browsers:
  console.error(err);

  consoleElem.innerText += endMessage;
}
