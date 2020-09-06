import * as moment from 'moment';

/**
 * Date pattern.
 * @see https://momentjs.com/docs/#/displaying/format/
 * @constant
 */
export const DATE_PATTERN = 'DD-MM-YYYY HH:mm';

/**
 * Transform passed date as a date pattern string.
 * @param source Source date to transform.
 */
export function dateToString(source: Date): string {
  const date = moment(source);

  return date.format(DATE_PATTERN);
}

/**
 * Parse passed string as Date. String must satisfy date pattern.
 * @param source Source string to parse.
 */
export function parseDate(source: string): Date {
  return moment(source, DATE_PATTERN).toDate();
}
