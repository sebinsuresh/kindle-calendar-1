import { Calendar } from './Widgets/Calendar';
import { Clock } from './Widgets/Clock';
import { DateWidget } from './Widgets/Date';
import { DayWidget } from './Widgets/Day';
import { NoteWidget } from './Widgets/Note';
import { Resolution } from './Widgets/Resolution';
import { Grid } from './Widgets/grid';

/**
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetConfig } BaseWidgetConfig
 * @typedef { import('./Widgets/Types/BaseWidgetTypes').BaseWidgetReturn } BaseWidgetReturn
 *
 * @typedef { keyof WidgetManager.Widgets } WidgetName
 *
 * @typedef { Object } WidgetManagerOptions
 * @property { Number } xColumn The x position of the widget in the grid
 * @property { Number } yColumn The y position of the widget in the grid
 * @property { Number } widthColumns The number of columns the widget takes up
 * @property { Number } heightRows The number of rows the widget takes up
 * @property { boolean } [showShadow] Whether to show a shadow behind the widget
 * @property { Number } [shadowType] The type of shadow to show behind the widget
 */
export class WidgetManager {
  /**
   * @param { HTMLElement } appElem
   * @param { Number } padding
   */
  constructor(appElem, padding) {
    this.appElem = appElem;
    this.padding = padding;

    // Subtract the border width from the available width/height, as well as padding:
    this.availableWidth = document.documentElement.clientWidth - 2 - this.padding * 2;
    this.availableHeight = document.documentElement.clientHeight - 2 - this.padding * 2;
  }

  static GridColumns = 12;
  static GridRows = 12;
  static ShadowTypes = {
    Solid: 1,
    Dashed: 2,
  };
  // TODO: Consider making these configurable
  static shadowWidth = 5;
  static shadowHeight = 5;
  static shadowXOffset = 8;
  static shadowYOffset = 8;

  static Widgets = {
    clock: {
      create: Clock.create,
      /** @type { import('./Widgets/Clock').Config } */
      defaultConfig: {},
    },
    date: {
      create: DateWidget.create,
      /** @type { import('./Widgets/Date').Config } */
      defaultConfig: {},
    },
    resolution: {
      create: Resolution.create,
      /** @type { import('./Widgets/Resolution').Config } */
      defaultConfig: {},
    },
    calendar: {
      create: Calendar.create,
      /** @type { import('./Widgets/Calendar').Config } */
      defaultConfig: {},
    },
    grid: {
      create: Grid.create,
      /** @type { import('./Widgets/grid').Config } */
      defaultConfig: {},
    },
    day: {
      create: DayWidget.create,
      /** @type { import('./Widgets/Day').Config } */
      defaultConfig: {},
    },
    note: {
      create: NoteWidget.create,
      /** @type { import('./Widgets/Note').Config } */
      defaultConfig: {
        text: 'This is a note',
      },
    },
  };

  /**
   * @template { WidgetName } W
   * @param { W } widgetName Must be one of the keys in WidgetManager.Widgets
   * @param { Parameters<WidgetManager.Widgets[W]["create"]>["0"] & WidgetManagerOptions } options The options to create the widget with
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

    // TODO: Return something that enables user to update/resize widgets created
    // TODO: Use the width/height to determine the font size
    // TODO: Take minimum width and height into account

    const calculatedWidth = options.widthColumns * (this.availableWidth / WidgetManager.GridColumns);
    const calculatedHeight = options.heightRows * (this.availableHeight / WidgetManager.GridRows);
    const calculatedX = this.padding + options.xColumn * (this.availableWidth / WidgetManager.GridColumns);
    const calculatedY = this.padding + options.yColumn * (this.availableHeight / WidgetManager.GridRows);
    element.style.left = Math.round(calculatedX) + 'px';
    element.style.top = Math.round(calculatedY) + 'px';
    element.style.width = Math.round(calculatedWidth) + 'px';
    element.style.height = Math.round(calculatedHeight) + 'px';

    if (options.showShadow) {
      const shadowElem = document.createElement('div');
      shadowElem.className += ' shadow';
      switch (options.shadowType) {
        case WidgetManager.ShadowTypes.Dashed:
          shadowElem.className += ' dashed';
          break;
        case WidgetManager.ShadowTypes.Solid:
        default:
          shadowElem.className += ' solid';
      }

      shadowElem.style.left = Math.round(calculatedX) + WidgetManager.shadowXOffset + 'px';
      shadowElem.style.top = Math.round(calculatedY) + WidgetManager.shadowYOffset + 'px';
      shadowElem.style.width = Math.round(calculatedWidth) + WidgetManager.shadowWidth + 'px';
      shadowElem.style.height = Math.round(calculatedHeight) + WidgetManager.shadowHeight + 'px';

      this.appElem.appendChild(shadowElem);
    }
    this.appElem.appendChild(element);
  }
}
