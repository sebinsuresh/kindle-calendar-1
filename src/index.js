import { Calendar } from './Widgets/Calendar';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { WidgetManager } from './WidgetManager';
import { DayWidget } from './Widgets/Day';

function handleOnLoad() {
  const appElem = document.getElementById('app');
  if (!appElem) {
    throw new Error('Could not find app element in page');
  }

  const widgetManager = new WidgetManager(appElem, 0);

  widgetManager.createWidget('grid', {
    xColumn: 0,
    yColumn: 0,
    widthColumns: WidgetManager.GridColumns,
    heightRows: WidgetManager.GridRows,
    columns: WidgetManager.GridColumns,
    rows: WidgetManager.GridRows,
    showHalfCells: false,
  });

  widgetManager.createWidget('day', {
    xColumn: 0.5,
    yColumn: 0.5,
    widthColumns: 1.5,
    heightRows: 1,
    displayMode: DayWidget.DisplayModes.Long,
    showShadow: true,
  });

  widgetManager.createWidget('date', {
    xColumn: 2.5,
    yColumn: 0.5,
    widthColumns: 2,
    heightRows: 1,
    showShadow: true,
  });

  widgetManager.createWidget('clock', {
    xColumn: 5,
    yColumn: 0.5,
    widthColumns: 2,
    heightRows: 1,
    showShadow: true,
  });

  widgetManager.createWidget('calendar', {
    xColumn: 0.5,
    yColumn: 2.5,
    widthColumns: 4,
    heightRows: 4,
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: Calendar.Themes.Light,
    daysMode: Calendar.DaysModes.Shortest,
    showShadow: true,
  });

  widgetManager.createWidget('resolution', {
    xColumn: 5.5,
    yColumn: 8,
    widthColumns: 2,
    heightRows: 1,
    showShadow: true,
  });

  widgetManager.createWidget('pageRefresh', {
    xColumn: 6.5,
    yColumn: 10,
    widthColumns: 3,
    heightRows: 1,
    showShadow: true,
  });

  widgetManager.createWidget('note', {
    xColumn: 0.5,
    yColumn: 7.5,
    widthColumns: 4,
    heightRows: 4,
    showShadow: true,
    text: `${getCookie('test')}`,
    monospaced: true,
  });

  widgetManager.createWidget('note', {
    xColumn: 5,
    yColumn: 2.5,
    widthColumns: 5,
    heightRows: 5,
    showShadow: true,
    text: `Work TODOs:
- Investigate bugs in prod
  - Replicate prod locally
- Expense devices
- Pick up new ticket`,
    monospaced: true,
    hideScrollbar: true,
  });

  setCookie('test', 'testvalue', new Date(2024, 0, 1));
}

/**
 * @param {string} name
 * @param {string} value
 * @param { Date } expires
 * @param {string} [path]
 * @param {string} [theDomain]
 * @param {any} [secure]
 */
function setCookie(name, value, expires, path, theDomain, secure) {
  value = escape(value);
  var theCookie =
    name +
    '=' +
    value +
    // @ts-ignore - toGMTString is deprecated, but supported in Kindle browser
    (expires ? '; expires=' + expires.toGMTString() : '') +
    (path ? '; path=' + path : '') +
    (theDomain ? '; domain=' + theDomain : '') +
    (secure ? '; secure' : '');
  document.cookie = theCookie;
}

/**
 * @param {string} Name
 */
function getCookie(Name) {
  var search = Name + '=';
  if (document.cookie.length > 0) {
    // if there are any cookies
    var offset = document.cookie.indexOf(search);
    if (offset != -1) {
      // if cookie exists
      offset += search.length;
      // set index of beginning of value
      var end = document.cookie.indexOf(';', offset);
      // set index of end of cookie value
      if (end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    }
  }
}
/**
 * @param {string} name
 * @param {string} path
 * @param {string} domain
 */
function delCookie(name, path, domain) {
  if (getCookie(name))
    document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01-Jan-70 00:00:01 GMT';
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
