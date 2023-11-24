import { getCentralTimeOffsetHours } from './getCentralTimeOffsetHours';

/** @returns { Date } */
export function getCurrentDate() {
  const now = new Date();
  const offsetHours = now.getTimezoneOffset() == 0 ? getCentralTimeOffsetHours(now) : 0;
  now.setHours(now.getHours() - offsetHours);
  return now;
}
