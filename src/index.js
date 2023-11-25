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

  widgetManager.createWidget('date', {
    xColumn: 1,
    yColumn: 0,
    widthColumns: 2,
    heightRows: 1,
  });

  widgetManager.createWidget('day', {
    xColumn: 0,
    yColumn: 0,
    widthColumns: 1,
    heightRows: 1,
    displayMode: DayWidget.DisplayModes.Long,
  });

  widgetManager.createWidget('clock', {
    xColumn: 3,
    yColumn: 0,
    widthColumns: 2,
    heightRows: 1,
  });

  widgetManager.createWidget('resolution', {
    xColumn: 2.5,
    yColumn: 4,
    widthColumns: 1,
    heightRows: 1,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: Calendar.Themes.Light,
    xColumn: 1,
    yColumn: 1,
    widthColumns: 2.5,
    heightRows: 2.5,
    daysMode: Calendar.DaysModes.Shortest,
  });

  widgetManager.createWidget('grid', {
    xColumn: 0,
    yColumn: 0,
    widthColumns: 6,
    heightRows: 6,
    columns: WidgetManager.GridColumns,
    rows: WidgetManager.GridRows,
    showHalfCells: true,
  });
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
