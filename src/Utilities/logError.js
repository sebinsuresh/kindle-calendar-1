/** @returns {HTMLElement} */
function getConsoleElem() {
  const consoleElem = document.getElementById('consoleElem');
  if (!consoleElem) {
    throw new Error('Could not find Console element in page');
  }
  return consoleElem;
}

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

  consoleElem.innerText += endMessage;
}
