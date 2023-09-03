import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { wrapTryCatch } from './Utilities/wrapTryCatch';
import { Resolution } from './Widgets/Resolution';

/**
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetReturn } BaseWidgetReturn
 * @type { { [key: string]: { create: (options: BaseWidgetConfig) => BaseWidgetReturn, defaultOptions: object } } }
 */
const Widgets = {
  Clock: {
    create: Clock.create,
    defaultOptions: {},
  },
  Date: {
    create: DateWidget.create,
    defaultOptions: {},
  },
  Resolution: {
    create: Resolution.create,
    defaultOptions: {},
  },
  Calendar: {
    create: Calendar.create,
    defaultOptions: {},
  },
};

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

  for (const widgetName in Widgets) {
    const widget = Widgets[widgetName];
    const widgetElem = widget.create(widget.defaultOptions);
    appElem.appendChild(widgetElem.returnElem);
  }
}

document.addEventListener('DOMContentLoaded', wrapTryCatch(handleOnLoad));
