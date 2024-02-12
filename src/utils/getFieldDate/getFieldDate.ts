import {
  DIGIT_REGEX,
  ISO_DATE_REGEX,
  ISO_DATE_TIME_REGEX,
  ISO_TIME_REGEX,
  ISO_TIME_SECOND_REGEX,
  ISO_WEEK_REGEX,
} from '../../regex.ts';

/**
 * Returns the decoded date of a field.
 *
 * @param value The field value.
 *
 * @returns The decoded date.
 */
export function getFieldDate(value: string) {
  // Null
  if (!value || value === 'null') {
    return null;
  }

  // Undefined
  if (value === 'undefined') {
    return undefined;
  }

  // Date (yyyy-mm-dd)
  if (ISO_DATE_REGEX.test(value)) {
    return new Date(`${value}T00:00:00.000Z`);
  }

  // Datetime (yyyy-mm-ddThh:mm)
  if (ISO_DATE_TIME_REGEX.test(value)) {
    return new Date(`${value}:00.000Z`);
  }

  // Week (yyyy-Www)
  if (ISO_WEEK_REGEX.test(value)) {
    const [year, week] = value.split('-W');
    const date = new Date(`${year}-01-01T00:00:00.000Z`);
    date.setUTCDate((+week - 1) * 7 + 1);
    return date;
  }

  // Time (hh:mm)
  if (ISO_TIME_REGEX.test(value)) {
    return new Date(`1970-01-01T${value}:00.000Z`);
  }

  // Timesecond (hh:mm:ss)
  if (ISO_TIME_SECOND_REGEX.test(value)) {
    return new Date(`1970-01-01T${value}.000Z`);
  }

  // Milliseconds
  if (DIGIT_REGEX.test(value)) {
    return new Date(+value);
  }

  // Otherwise
  return new Date(value);
}
