import { WeekDays } from '../Constants/Days';
import { Months } from '../Constants/Months';
import { getCurrentDate } from '../Utilities/getCurrentDate';

/**
 * @typedef { import('./Types/BaseWidgetConfig').BaseWidgetConfig } BaseWidgetConfig
 *
 * @typedef { Object } CalendarConfigProperties
 * @property { Number } [numRows] Number of rows to show in the calendar
 * @property { Number } [startCurrWeekOnRow] Which row to start the current week on
 *
 * @typedef { BaseWidgetConfig & CalendarConfigProperties } Config
 */

const defaultConfig = {
  numRows: 4,
  startCurrWeekOnRow: 1,
};

/** @returns { HTMLTableElement } */
function CreateTable() {
  const calendarElem = document.createElement('table');
  calendarElem.className += ' calendar';
  calendarElem.setAttribute('cellspacing', '0');
  calendarElem.setAttribute('cellpadding', '4');
  return calendarElem;
}

/**
 * Returns header row with month name and year
 * @param { Date } today
 * @returns { HTMLTableCellElement }
 */
function createCalendarHeader(today) {
  const calendarTh = document.createElement('th');
  calendarTh.setAttribute('colspan', '7');
  calendarTh.innerText = Months.Long[today.getMonth()] + ' ' + today.getFullYear();
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
 * Returns a cell for a single date with class names set
 * @param { Date } cellDate
 * @param { Date } today
 * @returns { HTMLTableCellElement }
 */
function createDateCell(cellDate, today) {
  const dayElem = document.createElement('td');

  const iterDate = cellDate.getDate();
  const iterMonth = cellDate.getMonth();

  if (cellDate < today) {
    dayElem.className += ' day-past';
  }
  if (iterMonth != today.getMonth()) {
    dayElem.className += ' month-other';
  }
  if (iterDate == today.getDate() && iterMonth == today.getMonth()) {
    dayElem.className += ' day-today';
  }

  dayElem.innerText = iterDate.toString();

  return dayElem;
}

/**
 * Returns row of dates for a week
 * @param { Date } startDate
 * @param { Date } today
 * @returns { HTMLTableRowElement }
 */
function createWeek(startDate, today) {
  const row = document.createElement('tr');
  for (let j = 0; j < WeekDays.Short.length; j++) {
    const dayElem = createDateCell(startDate, today);
    row.appendChild(dayElem);
    startDate.setDate(startDate.getDate() + 1);
  }
  return row;
}

/**
 * Creates the body of the calendar
 * @param { Date } today
 * @param { Number } currentWeekRowIndex
 * @param { Number } numRows
 * @returns { HTMLTableSectionElement }
 */
function createCalendarBody(today, currentWeekRowIndex, numRows) {
  const calendarBody = document.createElement('tbody');

  const daysHeader = createCalendarDaysHeader();
  calendarBody.appendChild(daysHeader);

  const startDateOfCurrentWeek = today.getDate() - today.getDay();
  const calendarStartDate = new Date(today.getTime());
  calendarStartDate.setDate(startDateOfCurrentWeek - currentWeekRowIndex * 7);

  for (let i = 0; i < numRows; i++) {
    const weekStartDate = new Date(calendarStartDate.getTime());
    const row = createWeek(weekStartDate, today);
    calendarBody.appendChild(row);

    calendarStartDate.setDate(calendarStartDate.getDate() + 7);
  }
  return calendarBody;
}

/**
 * Creates a calendar widget
 * @param { Config } config
 */
function createCalendar(config) {
  const { baseElem, numRows, startCurrWeekOnRow } = { ...defaultConfig, ...config };
  const now = getCurrentDate();

  const calendarElem = CreateTable();
  baseElem.appendChild(calendarElem);

  const calendarTHead = document.createElement('thead');
  calendarElem.appendChild(calendarTHead);

  const calendarTh = createCalendarHeader(now);
  calendarTHead.appendChild(calendarTh);

  const calendarBody = createCalendarBody(now, startCurrWeekOnRow, numRows);
  calendarElem.appendChild(calendarBody);

  const updateInMs =
    1000 * 60 * 60 * 24 -
    now.getHours() * 60 * 60 * 1000 -
    now.getMinutes() * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();
  // calendarTh.innerText += ` | Update in ${(updateInMs / 1000 / 60 / 60).toFixed(2)} hours`;
  setTimeout(() => {
    createCalendar(config);
  }, updateInMs);
}

export const Calendar = {
  create: createCalendar,
};
