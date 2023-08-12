const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** @type {HTMLElement} */
let appElem;
/** @type {HTMLElement} */
let consoleElem;

/**
 * @param {number} input
 * @param {number} numDigits
 * @returns {string}
 */
function getLeftZeroedString(input, numDigits) {
  if (numDigits > 3) throw new Error('numDigits must be <= 3');
  return ('000' + input).slice(-numDigits);
}

function getCdtOffsetHours() {
  return 5;
}

/** @returns {Date} */
function getCurrentDate() {
  const now = new Date();
  const offsetHours = now.getTimezoneOffset() == 0 ? getCdtOffsetHours() : 0;
  now.setHours(now.getHours() - offsetHours);
  return now;
}

/**
 * @param {boolean} showSeconds
 * @returns {string}
 * */
function getTimeString(showSeconds) {
  const now = getCurrentDate();

  const hours = now.getHours();
  const amPmHours = hours > 12 ? hours - 12 : hours;
  const amPm = hours >= 12 ? ' PM' : ' AM';

  const hoursStr = getLeftZeroedString(amPmHours, 2);
  const minsStr = getLeftZeroedString(now.getMinutes(), 2);

  let toReturn = `${hoursStr}:${minsStr}`;
  if (showSeconds) {
    toReturn += ':' + getLeftZeroedString(now.getSeconds(), 2);
  }
  toReturn += amPm;

  return toReturn;
}

/** @returns {string} */
function getDateString() {
  const now = getCurrentDate();
  const month = getLeftZeroedString(now.getMonth() + 1, 2);
  const date = getLeftZeroedString(now.getDate(), 2);
  const year = now.getFullYear().toString().slice(-2);
  return `${month}/${date}/${year}`;
}

/**
 * @param {HTMLElement} clockElem
 * @param {boolean} showSeconds
 * */
function setTime(clockElem, showSeconds) {
  clockElem.innerText = getTimeString(showSeconds);

  // Round to the start of next minute
  const updateInMs = (60 - new Date().getSeconds()) * 1000;
  setTimeout(function () {
    setTime(clockElem, showSeconds);
  }, updateInMs);
}

/**
 * @param {HTMLElement} dateElem
 * @param {boolean} showUpdateIn
 * */
function setDate(dateElem, showUpdateIn) {
  dateElem.innerText = getDateString();

  // Round to the start of next day
  const now = getCurrentDate();
  const updateInMs =
    24 * 60 * 60 * 1000 - (now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds()) * 1000;

  if (showUpdateIn) {
    const updateInHours = (updateInMs / 1000 / 60 / 60).toFixed(2);
    dateElem.innerText += ` (Update in: ${updateInHours} hrs.)`;
  }
  setTimeout(function () {
    setDate(dateElem, showUpdateIn);
  }, updateInMs);
}

/** @param {HTMLElement} baseElem */
function createClock(baseElem) {
  const clockElem = document.createElement('div');
  clockElem.className += ' clock';
  baseElem.appendChild(clockElem);
  setTime(clockElem, false);

  const dateElem = document.createElement('div');
  dateElem.className += ' date';
  baseElem.appendChild(dateElem);
  setDate(dateElem, false);
}

/** @param {HTMLElement} baseElem */
function createCalendar(baseElem) {
  const now = getCurrentDate();

  const calendarElem = document.createElement('table');
  calendarElem.className += ' calendar';
  calendarElem.setAttribute('cellspacing', '0');
  calendarElem.setAttribute('cellpadding', '4');
  // calendarElem.setAttribute("border", "0");
  // calendarElem.setAttribute("border-collapse", "collapse");
  baseElem.appendChild(calendarElem);

  const calendarHeaderElem = document.createElement('thead');
  calendarElem.appendChild(calendarHeaderElem);
  const calendarHeaderRowElem = document.createElement('th');
  calendarHeaderElem.appendChild(calendarHeaderRowElem);
  calendarHeaderRowElem.setAttribute('colspan', '7');
  calendarHeaderRowElem.innerText = months[now.getMonth()] + ' ' + now.getFullYear();

  const calendarBodyElem = document.createElement('tbody');
  calendarElem.appendChild(calendarBodyElem);

  const daysRow = document.createElement('tr');
  daysRow.className += ' days';
  calendarBodyElem.appendChild(daysRow);
  for (let i = 0; i < days.length; i++) {
    const dayElem = document.createElement('td');
    daysRow.appendChild(dayElem);
    dayElem.innerText = days[i];
  }

  const numRows = 4;
  const startCurrWeekOnRow = 1;

  const startDateOfCurrentWeek = now.getDate() - now.getDay();
  const pointerDate = new Date(now.getTime());
  pointerDate.setDate(startDateOfCurrentWeek - startCurrWeekOnRow * 7);
  // const startDateOfCalendar = calendarStartDate.getDate();

  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('tr');
    calendarBodyElem.appendChild(row);

    for (let j = 0; j < days.length; j++) {
      const dayElem = document.createElement('td');
      row.appendChild(dayElem);

      const iterDate = pointerDate.getDate();

      if (pointerDate < now) dayElem.className += ' day-past';
      if (pointerDate.getMonth() != now.getMonth()) dayElem.className += ' month-other';
      if (pointerDate.getDate() == now.getDate() && pointerDate.getMonth() == now.getMonth())
        dayElem.className += ' day-today';

      dayElem.innerText = iterDate.toString();
      pointerDate.setDate(iterDate + 1);
    }
  }
}

function handleOnLoad() {
  consoleElem = document.getElementById('consoleElem');
  appElem = document.getElementById('app');
  createClock(appElem);
  createCalendar(appElem);
}

document.addEventListener('DOMContentLoaded', handleOnLoad);
