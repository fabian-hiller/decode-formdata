/**
 * Returns the decoded date of a field.
 *
 * @param value The field value.
 *
 * @returns The decoded date.
 */
export function getFieldDate(value: string) {
  // Empty string
  if (!value) {
    return null;
  }

  // Date (yyyy-mm-dd)
  if (/^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])$/.test(value)) {
    return new Date(`${value}T00:00:00.000Z`);
  }

  // Datetime (yyyy-mm-ddThh:mm)
  if (
    /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])T(1\d|0[0-9]|2[0-3]):[0-5]\d$/.test(
      value
    )
  ) {
    return new Date(`${value}:00.000Z`);
  }

  // Week (yyyy-Www)
  if (/^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/.test(value)) {
    const [year, week] = value.split('-W');
    const date = new Date(`${year}-01-01T00:00:00.000Z`);
    date.setUTCDate((+week - 1) * 7 + 1);
    return date;
  }

  // Time (hh:mm)
  if (/^(1\d|0[0-9]|2[0-3]):[0-5]\d$/.test(value)) {
    return new Date(`1970-01-01T${value}:00.000Z`);
  }

  // Timeseconds (hh:mm:ss)
  if (/^(1\d|0[0-9]|2[0-3]):[0-5]\d:[0-5]\d$/.test(value)) {
    return new Date(`1970-01-01T${value}.000Z`);
  }

  // Timestamp ([0-9])
  if (/^\d+$/.test(value)) {
    return new Date(+value)
  }

  // Otherwise
  return new Date(value);
}
