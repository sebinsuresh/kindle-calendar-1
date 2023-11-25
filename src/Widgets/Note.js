/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef NoteConfigProperties
 * @type { object }
 * @property { string } [text] The text to display
 * @property { boolean } [monospaced] Whether to use a monospaced font
 *
 * @typedef { BaseWidgetConfig & NoteConfigProperties } Config
 */

const defaultConfig = {
  text: '',
  monospaced: false,
};

/**
 * @param { HTMLDivElement } noteElem
 * @param { string } text
 * @param { boolean } [monospaced]
 */
function addNotes(noteElem, text, monospaced) {
  const noteTextContainer = document.createElement('pre');
  noteTextContainer.className += ' note-text-container';
  noteTextContainer.innerText = text;
  if (monospaced) {
    noteTextContainer.className += ' monospaced';
  }
  noteElem.appendChild(noteTextContainer);
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  const { text, monospaced } = { ...defaultConfig, ...config };
  const containerElem = document.createElement('div');
  containerElem.className += ' note widget';

  addNotes(containerElem, text, monospaced);

  return {
    returnElem: containerElem,
    // TODO: Update this
    minWidth: 130,
    minHeight: 21,
    // TODO: Add update function
  };
}

export const NoteWidget = {
  create: createWidget,
};
