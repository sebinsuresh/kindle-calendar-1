import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { Resolution } from './Widgets/Resolution';

/**
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetReturn } BaseWidgetReturn
 */

class WidgetManager {
  /** @type { { [key: string]: { create: (options: BaseWidgetConfig) => BaseWidgetReturn, defaultOptions: BaseWidgetConfig } } } */
  static Widgets = {
    clock: {
      create: Clock.create,
      defaultOptions: {},
    },
    date: {
      create: DateWidget.create,
      defaultOptions: {},
    },
    resolution: {
      create: Resolution.create,
      defaultOptions: {},
    },
    calendar: {
      create: Calendar.create,
      defaultOptions: {},
    },
  };

  /**
   * @param { string } widgetName Must be one of the keys in WidgetManager.Widgets
   * @param { BaseWidgetConfig } options The options to pass to the widget
   */
  static createWidget(widgetName, options) {
    const widget = WidgetManager.Widgets[widgetName];
    if (!widget) {
      throw new Error(`Could not find widget with name ${widgetName}`);
    }

    return widget.create(options);
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

  for (const widgetName in WidgetManager.Widgets) {
    const widget = WidgetManager.Widgets[widgetName];
    const widgetElem = widget.create(widget.defaultOptions);
    appElem.appendChild(widgetElem.returnElem);
  }
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
