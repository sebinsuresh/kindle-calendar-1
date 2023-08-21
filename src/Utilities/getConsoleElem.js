/** @returns {HTMLElement} */
export function getConsoleElem() {
  const consoleElem = document.getElementById('consoleElem');
  if (!consoleElem) {
    throw new Error('Could not find Console element in page');
  }
  return consoleElem;
}
