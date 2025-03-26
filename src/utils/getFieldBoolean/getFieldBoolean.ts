/**
 * Returns the decoded boolean of a field.
 *
 * @param value The field value.
 *
 * @returns The decoded boolean.
 */
export function getFieldBoolean(value: FormDataEntryValue): boolean | null | undefined {
  // Null
  if (!value || value === 'null') {
    return null;
  }

  // Undefined
  if (value === 'undefined') {
    return undefined;
  }

  // Otherwise
  return !(value === 'false' || value === 'off' || value === '0');
}
