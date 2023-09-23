import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { Resolution } from './Widgets/Resolution';

/**
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetReturn } BaseWidgetReturn
 *
 * @typedef { 'clock' | 'date' | 'resolution' | 'calendar' } WidgetName
 */

class WidgetManager {
  // /** @type { { [key in WidgetName]: { create: (options: BaseWidgetConfig) => BaseWidgetReturn, defaultConfig: BaseWidgetConfig } } } */
  static Widgets = {
    clock: {
      /** @type {import('./Widgets/Clock').createWidget} */
      create: Clock.create,
      /** @type {import('./Widgets/Clock').Config} */
      defaultConfig: {},
    },
    date: {
      /** @type {import('./Widgets/Date').createWidget} */
      create: DateWidget.create,
      /** @type {import('./Widgets/Date').Config} */
      defaultConfig: {},
    },
    resolution: {
      /** @type {import('./Widgets/Resolution').createWidget}*/
      create: Resolution.create,
      /** @type {import('./Widgets/Resolution').Config} */
      defaultConfig: {},
    },
    calendar: {
      /** @type {import('./Widgets/Calendar').createWidget}*/
      create: Calendar.create,
      /** @type {import('./Widgets/Calendar').Config}*/
      defaultConfig: {},
    },
  };

  /**
   * @param { WidgetName } widgetName Must be one of the keys in WidgetManager.Widgets
   * @param { WidgetManager.Widgets[WidgetName]["defaultConfig"] } [options] The options to pass to the widget
   * @returns { BaseWidgetReturn } Result of calling `create()` on the widget
   */
  static createWidget(widgetName, options) {
    const widget = WidgetManager.Widgets[widgetName];
    if (!widget) {
      throw new Error(`Could not find widget with name ${widgetName}`);
    }

    return widget.create(options ?? widget.defaultConfig);
  }
}

function handleOnLoad() {
  const appElem = document.getElementById('app');
  if (!appElem) {
    throw new Error('Could not find app element in page');
  }

  // For each widget, we should maybe specify:
  // - The x position of this widget
  // - The y position of this widget
  // - Number of columns this widget takes up
  // - Number of rows this widget takes up

  const test1 = WidgetManager.Widgets.calendar.defaultConfig;

  const test2 = WidgetManager.createWidget('calendar', {
    numRows: 4,
    startCurrWeekOnRow: 1,
    showUpdateInHrs: false,
    theme: 1,
  });

  // for (const widgetName in WidgetManager.Widgets) {
  //   const widget = WidgetManager.createWidget(widgetName, { someKey: 'value' });
  //   appElem.appendChild(widget.returnElem);
  // }
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
