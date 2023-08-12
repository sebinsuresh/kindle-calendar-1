import { getCurrentDate } from '../Utilities/getCurrentDate';
import { WeekDays } from '../Constants/days';
import { Months } from '../Constants/months';

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
  calendarHeaderRowElem.innerText = Months.Long[now.getMonth()] + ' ' + now.getFullYear();

  const calendarBodyElem = document.createElement('tbody');
  calendarElem.appendChild(calendarBodyElem);

  const daysRow = document.createElement('tr');
  daysRow.className += ' days';
  calendarBodyElem.appendChild(daysRow);
  for (let i = 0; i < WeekDays.Short.length; i++) {
    const dayElem = document.createElement('td');
    daysRow.appendChild(dayElem);
    dayElem.innerText = WeekDays.Short[i];
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

    for (let j = 0; j < WeekDays.Short.length; j++) {
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

export const Calendar = {
  configure: (config) => {},
  create: createCalendar,
};
