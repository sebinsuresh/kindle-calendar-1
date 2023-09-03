import { getCurrentDate } from './getCurrentDate';
import { getLeftZeroedString } from './getLeftZeroedString';

/**
 * @param { boolean } showSeconds
 * @returns { string }
 */
export function getTimeString(showSeconds) {
  const now = getCurrentDate();

  const hours = now.getHours();
  const amPmHours = hours > 12 ? hours - 12 : hours;
  const amPm = hours >= 12 ? ' PM' : ' AM';

  let hoursStr = getLeftZeroedString(amPmHours, 2);
  if (hoursStr === '00') {
    hoursStr = '12';
  }
  const minsStr = getLeftZeroedString(now.getMinutes(), 2);

  let toReturn = `${hoursStr}:${minsStr}`;
  if (showSeconds) {
    toReturn += ':' + getLeftZeroedString(now.getSeconds(), 2);
  }
  toReturn += amPm;

  return toReturn;
}
