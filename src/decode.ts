import { FormDataInfo, FormDataTransform } from './types.ts';
import { getFieldValue, getPathObject, getValuePaths } from './utils/index.ts';

/**
 * Decodes the form data entries. Information that is lost during the transfer
 * via HTTP can be supplemented.
 *
 * @param formData The form data object.
 * @param info The form data info.
 * @param transform The value transformation.
 *
 * @returns The decoded form values.
 */
export function decode<
  TOutput extends Record<string, any> = Record<string, unknown>,
>(
  formData: FormData,
  info: FormDataInfo,
  transform?: FormDataTransform
): TOutput;

/**
 * Decodes the form data entries. Information that is lost during the transfer
 * via HTTP can be supplemented.
 *
 * @param formData The form data object.
 * @param transform The value transformation.
 *
 * @returns The decoded form values.
 */
export function decode<
  TOutput extends Record<string, any> = Record<string, unknown>,
>(formData: FormData, transform?: FormDataTransform): TOutput;

export function decode<
  TOutput extends Record<string, any> = Record<string, unknown>,
>(
  formData: FormData,
  arg2?: FormDataInfo | FormDataTransform,
  arg3?: FormDataTransform
): TOutput {
  // Get info and transform argument
  const [info, transform] =
    typeof arg2 === 'function' ? [undefined, arg2] : [arg2, arg3];

  // Create empty values object
  const values: any = {};

  // Add each form entry to values
  for (const [path, input] of formData.entries()) {
    // Create template name and keys
    const templateName = path
      .replace(/\.\d+\./g, '.$.')
      .replace(/\.\d+$/, '.$');
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
        (input && (typeof input === 'string' || input.size))
      ) {
        // Get field value
        console.log('templateName', templateName);
        let output = getFieldValue(info, templateName, input);

        // Transform value if necessary
        if (transform) {
          output = transform({ path, input, output });
        }

        // If it is an non-indexed array, add value to array
        if (info?.arrays?.includes(templateName)) {
          if (object[key]) {
            object[key].push(output);
          } else {
            object[key] = [output];
          }

          // Otherwise, add value directly to key
        } else {
          object[key] = output;
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
