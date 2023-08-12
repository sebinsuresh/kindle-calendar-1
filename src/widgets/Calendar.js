import { WeekDays } from '../Constants/Days';
import { Months } from '../Constants/Months';
import { getCurrentDate } from '../Utilities/getCurrentDate';

function createElement() {
  const calendarElem = document.createElement('table');
  calendarElem.className += ' calendar';
  calendarElem.setAttribute('cellspacing', '0');
  calendarElem.setAttribute('cellpadding', '4');
  return calendarElem;
}

/** @param {HTMLElement} baseElem */
function createCalendar(baseElem) {
  const now = getCurrentDate();

  const calendarElem = createElement();
  baseElem.appendChild(calendarElem);

  const calendarTHead = document.createElement('thead');
  calendarElem.appendChild(calendarTHead);

  const calendarTh = document.createElement('th');
  calendarTh.setAttribute('colspan', '7');
  calendarTh.innerText = Months.Long[now.getMonth()] + ' ' + now.getFullYear();
  calendarTHead.appendChild(calendarTh);

  const calendarBody = document.createElement('tbody');
  calendarElem.appendChild(calendarBody);

  const daysRow = document.createElement('tr');
  daysRow.className += ' days';
  calendarBody.appendChild(daysRow);
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
    calendarBody.appendChild(row);

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
