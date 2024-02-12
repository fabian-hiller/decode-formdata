import { FormDataInfo } from '../../types.ts';
import { getFieldBoolean } from '../getFieldBoolean/getFieldBoolean.ts';
import { getFieldDate } from '../getFieldDate/index.ts';
import { getFieldNumber } from '../getFieldNumber/getFieldNumber.ts';

/**
 * Returns the decoded value of a field.
 *
 * @param templateName The template name.
 * @param value The field value.
 * @param info The form data info.
 *
 * @returns The decoded value.
 */
export function getFieldValue(
  info: FormDataInfo | undefined,
  templateName: string,
  value: FormDataEntryValue
) {
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
