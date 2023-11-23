/** @param { Date } date */
export function getCdtOffsetHours(date) {
  // Daylight savings time starts on the second Sunday of March
  // and ends on the first Sunday of November
  const isDST =
    (date.getMonth() > 2 && date.getMonth() < 10) ||
    (date.getMonth() === 2 && isOnOrAfterNthSunday(date, 2)) ||
    (date.getMonth() === 10 && !isOnOrAfterNthSunday(date, 1));

  return isDST ? 5 : 6;
}

/**
 * @param { Date } date The date to check
 * @param { number } n Starts counting at 1
 */
function isOnOrAfterNthSunday(date, n) {
  return date.getDate() - date.getDay() >= 7 * (n - 1);
}
