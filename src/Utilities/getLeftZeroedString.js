/**
 * @param { number } input
 * @param { number } numDigits
 * @returns { string }
 */
export function getLeftZeroedString(input, numDigits) {
  if (numDigits > 3) throw new Error('numDigits must be <= 3');
  return ('000' + input).slice(-numDigits);
}
