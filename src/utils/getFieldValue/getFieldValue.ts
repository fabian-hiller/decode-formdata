import type { FormDataInfo } from '../../types.ts';
import { getFieldBoolean } from '../getFieldBoolean/getFieldBoolean.ts';
import { getFieldDate } from '../getFieldDate/index.ts';
import { getFieldNumber } from '../getFieldNumber/getFieldNumber.ts';

/**
 * Returns the decoded value of a field.
 *
 * @param info The form data info.
 * @param templateName The template name.
 * @param value The field value.
 *
 * @returns The decoded value.
 */
export function getFieldValue(
  info: FormDataInfo | undefined,
  templateName: string,
  value: FormDataEntryValue
): boolean | Date | number | FormDataEntryValue | null | undefined {
  // Booleans
  if (info?.booleans?.includes(templateName)) {
    return getFieldBoolean(value);
  }

  if (typeof value === 'string') {
    // Dates
    if (info?.dates?.includes(templateName)) {
      return getFieldDate(value);
    }

    // Numbers
    if (info?.numbers?.includes(templateName)) {
      return getFieldNumber(value);
    }
  }

  // Otherwise
  return value;
}
