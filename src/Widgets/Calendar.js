import { WeekDays } from '../Constants/Days';
import { Months } from '../Constants/Months';
import { getCurrentDate } from '../Utilities/getCurrentDate';

/**
 * @typedef { import('./Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } CalendarConfigProperties
 * @property { Number } [numRows] Number of rows to show in the calendar
 * @property { Number } [startCurrWeekOnRow] Which row to start the current week on
 * @property { Boolean } [showUpdateInHrs] Whether to show the time until the next update
 * @property { Number } [theme] Which theme to use from `Themes`
 *
 * @typedef { BaseWidgetConfig & CalendarConfigProperties } Config
 */

const Themes = {
  Light: 1,
  Dark: 2,
};

const defaultConfig = {
  numRows: 4,
  startCurrWeekOnRow: 1,
  showUpdateInHrs: false,
  theme: Themes.Light,
};

const Modes = {
  /** First day of month goes in 1st row */
  Month: 1,
  /** Current day appears in startCurrWeekOnRow-th row */
  Week: 2,
};

/**
 * @param { Number } theme Must be one of `Themes`
 * @returns { HTMLTableElement }
 */
function CreateTable(theme) {
  const calendarElem = document.createElement('table');
  calendarElem.className += ' calendar widget';
  calendarElem.className += theme === Themes.Dark ? ' dark' : ' light';
  calendarElem.setAttribute('cellspacing', '0');
  calendarElem.setAttribute('cellpadding', '4');
  return calendarElem;
}

/**
 * Returns header row for displaying month name and year
 * @returns { HTMLTableCellElement }
 */
function createCalendarHeader() {
  const calendarTh = document.createElement('th');
  calendarTh.setAttribute('colspan', '7');
  calendarTh.innerText = 'Month Year';
  return calendarTh;
}

/**
 * Returns a row of day names
 * @returns { HTMLTableRowElement }
 */
function createCalendarDaysHeader() {
  const daysRow = document.createElement('tr');
  daysRow.className += ' days';
  for (let i = 0; i < WeekDays.Short.length; i++) {
    const dayElem = document.createElement('td');
    daysRow.appendChild(dayElem);
    dayElem.innerText = WeekDays.Short[i];
  }
  return daysRow;
}

/**
 * Returns td element for the cell for a single date
 * @returns { HTMLTableCellElement }
 */
function createDateCell() {
  const dayElem = document.createElement('td');
  dayElem.innerText = '#';
  return dayElem;
}

/**
 * Returns tr elements for for a week in the calendar
 * @returns { HTMLTableRowElement }
 */
function createWeek() {
  const row = document.createElement('tr');
  for (let j = 0; j < WeekDays.Short.length; j++) {
    const dayElem = createDateCell();
    row.appendChild(dayElem);
  }
  return row;
}

/**
 * Creates and returns the body of the calendar
 * @param { Number } numWeeks
 * @returns { HTMLTableSectionElement }
 */
function createCalendarBody(numWeeks) {
  const calendarBody = document.createElement('tbody');

  const daysHeader = createCalendarDaysHeader();
  calendarBody.appendChild(daysHeader);

  for (let i = 0; i < numWeeks; i++) {
    const row = createWeek();
    calendarBody.appendChild(row);
  }
  return calendarBody;
}

/**
 * @param { HTMLTableElement } calendarTable
 * @param { Date } today
 */
function setCalendarHeader(calendarTable, today) {
  const content = Months.Long[today.getMonth()] + ' ' + today.getFullYear();
  const header = calendarTable.getElementsByTagName('th')[0];
  header.innerText = content;
}

/**
 * @param {Date} cellDate
 * @param {Date} today
 * @param {HTMLTableCellElement} dayElem
 */
function setDateCell(cellDate, today, dayElem) {
  const iterDate = cellDate.getDate();
  const iterMonth = cellDate.getMonth();

  dayElem.className = dayElem.className
    .replace(' day-past', '')
    .replace(' month-other', '')
    .replace(' day-today', '')
    .trim();

  if (cellDate < today) {
    dayElem.className += ' day-past';
  }
  if (iterMonth != today.getMonth()) {
    dayElem.className += ' month-other';
  }
  if (iterDate === today.getDate() && iterMonth === today.getMonth()) {
    dayElem.className += ' day-today';
  }

  dayElem.innerText = iterDate.toString();
}

/**
 * @param {HTMLTableElement} calendarTable
 * @param {Date} today
 */
function setCalendarDays(calendarTable, today) {
  const rows = calendarTable.getElementsByTagName('tr');

  const numWeeks = parseInt(calendarTable.getAttribute('data-num-rows') ?? '') ?? defaultConfig.numRows;
  const startCurrWeekOnRow =
    parseInt(calendarTable.getAttribute('data-start-curr-week-on-row') ?? '') ??
    defaultConfig.startCurrWeekOnRow;

  const startDateOfTodaysWeek = today.getDate() - today.getDay();
  const iterationDate = new Date(today.getTime());
  iterationDate.setDate(startDateOfTodaysWeek - startCurrWeekOnRow * 7);
  let iterationWeekRow = rows[1];
  for (let i = 0; i < WeekDays.Short.length * numWeeks; i++) {
    const dayElem = iterationWeekRow.getElementsByTagName('td')[i % 7];
    setDateCell(iterationDate, today, dayElem);
    iterationDate.setDate(iterationDate.getDate() + 1);

    if (numWeeks > 1 && i % 7 === 6) {
      iterationWeekRow = rows[~~(i / 7) + 2];
    }
  }
}

/**
 * @param {HTMLTableElement} calendarTable
 * @param {Boolean} showUpdateInHrs
 */
function populateCalendar(calendarTable, showUpdateInHrs) {
  const now = getCurrentDate();
  setCalendarHeader(calendarTable, now);
  setCalendarDays(calendarTable, now);

  const updateInMs =
    1000 * 60 * 60 * 24 -
    now.getHours() * 60 * 60 * 1000 -
    now.getMinutes() * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();

  if (showUpdateInHrs) {
    const calendarTh = calendarTable.getElementsByTagName('th')[0];
    calendarTh.innerText += ` | Update in ${(updateInMs / 1000 / 60 / 60).toFixed(2)} hours`;
  }
  setTimeout(() => {
    populateCalendar(calendarTable, showUpdateInHrs);
  }, updateInMs);
}

/**
 * Creates a calendar widget
 * @param { Config } config
 * @returns { import('./Types/BaseWidgetTypes').BaseWidgetReturn }
 */
export function createWidget(config) {
  const { numRows, startCurrWeekOnRow, showUpdateInHrs, theme } = { ...defaultConfig, ...config };

  const calendarElem = CreateTable(theme);
  calendarElem.setAttribute('data-num-rows', numRows.toString());
  calendarElem.setAttribute('data-start-curr-week-on-row', startCurrWeekOnRow.toString());

  const calendarTHead = document.createElement('thead');
  calendarElem.appendChild(calendarTHead);

  const calendarTh = createCalendarHeader();
  calendarTHead.appendChild(calendarTh);

  const calendarBody = createCalendarBody(numRows);
  calendarElem.appendChild(calendarBody);

  populateCalendar(calendarElem, showUpdateInHrs);

  return {
    returnElem: calendarElem,
    minWidth: 252,
    minHeight: 176,
    // TODO: Add update function
  };
}

export const Calendar = {
  create: createWidget,
  Themes,
};
