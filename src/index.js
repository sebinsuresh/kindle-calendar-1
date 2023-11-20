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
 */

class WidgetManager {
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
   * @param { Parameters<WidgetManager.Widgets[W]["create"]>["0"] } [options] The options to pass to the widget's `create()` function
   * @returns Result of calling `create()` on the widget
   */
  static createWidget(widgetName, options) {
    const widget = WidgetManager.Widgets[widgetName];
    if (!widget) {
      throw new Error(`Could not find widget with name ${widgetName}`);
    }

    // Type casting to make things work without ts-ignore:
    return /** @type { ReturnType<WidgetManager.Widgets[W]["create"]> } */ (
      widget.create(options ?? widget.defaultConfig)
    );
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
  //   // Casting to avoid adding ts-ignore:
  //   const widget = WidgetManager.createWidget(/**@type { WidgetName }*/ (widgetName), { theme: 1 });
  //   appElem.appendChild(widget.returnElem);
  // }
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
