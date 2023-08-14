import { getCurrentDate } from './getCurrentDate';
import { getLeftZeroedString } from './getLeftZeroedString';

/** @returns { string } */
export function getDateString() {
  const now = getCurrentDate();
  const month = getLeftZeroedString(now.getMonth() + 1, 2);
  const date = getLeftZeroedString(now.getDate(), 2);
  const year = now.getFullYear().toString().slice(-2);
  return `${month}/${date}/${year}`;
}
