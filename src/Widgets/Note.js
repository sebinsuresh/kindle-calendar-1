/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef NoteConfigProperties
 * @type { object }
 * @property { string } [text] The text to display
 * @property { boolean } [monospaced] Whether to use a monospaced font
 * @property { boolean } [hideScrollbar] Whether to hide the scrollbar
 * @property { number } [fontSize] The font size to use
 *
 * @typedef { BaseWidgetConfig & NoteConfigProperties } Config
 */

const defaultConfig = {
  text: '',
  monospaced: false,
  hideScrollbar: false,
  fontSize: 16,
};

/**
 * @param { HTMLDivElement } noteElem
 * @param { string } text
 * @param { boolean } [monospaced]
 * @param { number } [fontSize]
 */
function addNotes(noteElem, text, monospaced, fontSize) {
  const noteTextContainer = document.createElement('pre');
  noteTextContainer.className += ' note-text-container';
  noteTextContainer.innerText = text;
  if (monospaced) {
    noteTextContainer.className += ' monospaced';
  }
  if (fontSize) {
    noteTextContainer.style.fontSize = `${fontSize}px`;
  }
  noteElem.appendChild(noteTextContainer);
}

/**
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  const { text, monospaced, hideScrollbar, fontSize } = { ...defaultConfig, ...config };

  const containerElem = document.createElement('div');
  containerElem.className += ' note widget';
  if (hideScrollbar) {
    containerElem.className += ' hide-scrollbar';
  }
  addNotes(containerElem, text, monospaced, fontSize);

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
