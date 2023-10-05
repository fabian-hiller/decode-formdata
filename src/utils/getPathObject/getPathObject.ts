/**
 * Returns the value of a path and supplements empty arrays and objects.
 *
 * @param pathKeys The path keys.
 * @param templateKeys The template keys.
 * @param values The values object.
 *
 * @returns The path value.
 */
export function getPathObject(
  pathKeys: string[],
  templateKeys: string[],
  values: any
): any {
  return pathKeys.reduce(
    (object, key, index) =>
      (object[key] =
        object[key] || (templateKeys[index + 1] === '$' ? [] : {})),
    values
  );
}
