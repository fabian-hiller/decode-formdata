import { NUMBER_REGEX } from '../../regex.ts';
import { getFieldDate } from '../getFieldDate/index.ts';

/**
 * Returns the decoded number of a field.
 *
 * @param value The field value.
 *
 * @returns The decoded number.
 */
export function getFieldNumber(value: string): number | null | undefined {
  // Null
  if (!value || value === 'null') {
    return null;
  }

  // Undefined
  if (value === 'undefined') {
    return undefined;
  }

  // Number
  if (NUMBER_REGEX.test(value)) {
    return Number(value);
  }

  // Date
  return getFieldDate(value)!.getTime();
}
