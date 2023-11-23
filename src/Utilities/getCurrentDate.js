import { getCdtOffsetHours } from './getCdtOffsetHours';

/** @returns { Date } */
export function getCurrentDate() {
  const now = new Date();
  const offsetHours = now.getTimezoneOffset() == 0 ? getCdtOffsetHours(now) : 0;
  now.setHours(now.getHours() - offsetHours);
  return now;
}
