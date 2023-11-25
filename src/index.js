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

  widgetManager.createWidget('note', {
    xColumn: 0.5,
    yColumn: 7.5,
    widthColumns: 4,
    heightRows: 4,
    showShadow: true,
    text: `Things to do:
- Test item 1
- Test item 2
- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
- Test item 4`,
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
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
