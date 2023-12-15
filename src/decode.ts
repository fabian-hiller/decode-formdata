import { FormDataInfo } from './types.ts';
import { getFieldValue, getPathObject, getValuePaths } from './utils/index.ts';

/**
 * Decodes the form data entries. Information that is lost during the transfer
 * via HTTP can be supplemented.
 *
 * @param formData The form data object.
 * @param info The form data info.
 *
 * @returns The decoded form values.
 */
export function decode<
  TOutput extends Record<string, any> = Record<string, unknown>,
>(formData: FormData, info?: FormDataInfo): TOutput {
  // Create empty values object
  const values: any = {};

  // Add each form entry to values
  for (const [path, value] of formData.entries()) {
    // Create template name and keys
    const templateName = path.replace(/.\d+./g, '.$.');
    const templateKeys = templateName.split('.');

    // Add value of current field to values
    path.split('.').reduce((object, key, index, keys) => {
      // If it is not last index, return array or object
      if (index < keys.length - 1) {
        // If array or object already exists, return it
        if (object[key]) {
          return object[key];
        }

        // Otherwise, check if value is an array
        const isArray =
          index < keys.length - 2
            ? templateKeys[index + 1] === '$'
            : info?.arrays?.includes(templateKeys.slice(0, -1).join('.'));

        // Add and return empty array or object
        return (object[key] = isArray ? [] : {});
      }

      // Otherwise, if it is not an empty file, add value
      if (
        !info?.files?.includes(templateName) ||
        (value && (typeof value === 'string' || value.size))
      ) {
        // Get field value
        const fieldValue = getFieldValue(info, templateName, value);

        // If it is an non-indexed array, add value to array
        if (info?.arrays?.includes(templateName)) {
          if (object[key]) {
            object[key].push(fieldValue);
          } else {
            object[key] = [fieldValue];
          }

          // Otherwise, add value directly to key
        } else {
          object[key] = fieldValue;
        }
      }
    }, values);
  }

  // Supplement empty arrays if necessary
  if (info?.arrays) {
    for (const templateName of info.arrays) {
      // Get every value path by template
      const paths = getValuePaths(templateName, values);

      // Add empty array to each value path
      for (const path of paths) {
        // Get value keys and last key
        const valueKeys = path.split('.');
        const lastKey = valueKeys[valueKeys.length - 1];

        // Get parent value of path
        const parent = getPathObject(
          valueKeys.slice(0, -1),
          templateName.split('.'),
          values
        );

        // Add empty array if necessary
        if (!parent[lastKey]) {
          parent[lastKey] = [];
        }
      }
    }
  }

  // Supplement "false" booleans if necessary
  if (info?.booleans) {
    for (const templateName of info.booleans) {
      // Get every value path by template
      const paths = getValuePaths(templateName, values);

      // Add "false" boolean to each value path
      for (const path of paths) {
        // Get value keys and last key
        const valueKeys = path.split('.');
        const lastKey = valueKeys[valueKeys.length - 1];

        // Get parent value of path
        const parent = getPathObject(
          valueKeys.slice(0, -1),
          templateName.split('.'),
          values
        );

        // Add "false" boolean if necessary
        if (parent[lastKey] !== true) {
          parent[lastKey] = false;
        }
      }
    }
  }

  // Return values object
  return values;
}
