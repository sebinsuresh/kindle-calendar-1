import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { Resolution } from './Widgets/Resolution';

/**
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetReturn } BaseWidgetReturn
 *
 * @typedef { keyof WidgetManager.Widgets } WidgetName
 *
 * @typedef { Object } WidgetDimensions
 * @property { Number } xColumn The x position of the widget in the grid
 * @property { Number } yColumn The y position of the widget in the grid
 * @property { Number } widthColumns The number of columns the widget takes up
 * @property { Number } heightRows The number of rows the widget takes up
 */

class WidgetManager {
  /** @param { HTMLElement } appElem */
  constructor(appElem) {
    this.appElem = appElem;
    this.availableWidth = document.documentElement.clientWidth;
    this.availableHeight = document.documentElement.clientHeight;
  }

  static GridColumns = 6;
  static GridRows = 6;
  static InnerPaddingPx = 10;

  static Widgets = {
    clock: {
      create: Clock.create,
      /** @type {import('./Widgets/Clock').Config} */
      defaultConfig: {},
    },
    date: {
      create: DateWidget.create,
      /** @type {import('./Widgets/Date').Config} */
      defaultConfig: {},
    },
    resolution: {
      create: Resolution.create,
      /** @type {import('./Widgets/Resolution').Config} */
      defaultConfig: {},
    },
    calendar: {
      create: Calendar.create,
      /** @type {import('./Widgets/Calendar').Config}*/
      defaultConfig: {},
    },
  };

  /**
   * @template { WidgetName } W
   * @param { W } widgetName Must be one of the keys in WidgetManager.Widgets
   * @param { Parameters<WidgetManager.Widgets[W]["create"]>["0"] & WidgetDimensions } options The options to create the widget with
   */
  createWidget(widgetName, options) {
    const widget = WidgetManager.Widgets[widgetName];
    if (!widget) {
      throw new Error(`Could not find widget with name ${widgetName}`);
    }

    // Type casting to make things work without ts-ignore:
    const { returnElem: element } = /** @type { ReturnType<WidgetManager.Widgets[W]["create"]> } */ (
      widget.create(options ?? widget.defaultConfig)
    );

    // TODO: Take minimum width and height into account
    element.style.left =
      (options.xColumn * this.availableWidth) / WidgetManager.GridColumns +
      WidgetManager.InnerPaddingPx +
      'px';
    element.style.top =
      (options.yColumn * this.availableHeight) / WidgetManager.GridRows + WidgetManager.InnerPaddingPx + 'px';
    element.style.width =
      (options.widthColumns * (this.availableWidth - 2 * WidgetManager.InnerPaddingPx)) /
        WidgetManager.GridColumns +
      'px';
    element.style.height =
      (options.heightRows * (this.availableHeight - 2 * WidgetManager.InnerPaddingPx)) /
        WidgetManager.GridRows +
      'px';

    this.appElem.appendChild(element);
  }
}

function handleOnLoad() {
  const appElem = document.getElementById('app');
  if (!appElem) {
    throw new Error('Could not find app element in page');
  }

  const widgetManager = new WidgetManager(appElem);

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 0,
    yColumn: 0,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 2,
    yColumn: 0,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 4,
    yColumn: 0,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 0,
    yColumn: 2,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 2,
    yColumn: 2,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 4,
    yColumn: 2,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 0,
    yColumn: 4,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 2,
    yColumn: 4,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 4,
    yColumn: 4,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 1,
    yColumn: 1,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 3,
    yColumn: 1,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 1,
    yColumn: 3,
    widthColumns: 2,
    heightRows: 2,
  });

  widgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
    xColumn: 3,
    yColumn: 3,
    widthColumns: 2,
    heightRows: 2,
  });

  // for (const widgetName in WidgetManager.Widgets) {
  //   // Casting to avoid adding ts-ignore:
  //   const widget = WidgetManager.createWidget(/**@type { WidgetName }*/ (widgetName), { theme: 1 });
  //   appElem.appendChild(widget.returnElem);
  // }
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
