import { Calendar } from './Widgets/Calendar';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { WidgetManager } from './WidgetManager';
import { DayWidget } from './Widgets/Day';

function handleOnLoad() {
  const appElem = document.getElementById('app');
  if (!appElem) {
    throw new Error('Could not find app element in page');
  }

  const widgetManager = new WidgetManager(appElem);

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
    xColumn: 1,
    yColumn: 1,
    widthColumns: 1,
    heightRows: 1,
    displayMode: DayWidget.DisplayModes.Long,
  });

  widgetManager.createWidget('date', {
    xColumn: 3,
    yColumn: 1,
    widthColumns: 2,
    heightRows: 1,
  });

  widgetManager.createWidget('clock', {
    xColumn: 6,
    yColumn: 1,
    widthColumns: 2,
    heightRows: 1,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: Calendar.Themes.Light,
    xColumn: 4,
    yColumn: 4,
    widthColumns: 4,
    heightRows: 4,
    daysMode: Calendar.DaysModes.Shortest,
  });

  widgetManager.createWidget('resolution', {
    xColumn: 5,
    yColumn: 9,
    widthColumns: 3,
    heightRows: 1,
  });
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
