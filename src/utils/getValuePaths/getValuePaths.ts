import { getPathObject } from '../getPathObject/index.ts';

/**
 * Returns every possible value path.
 *
 * @param templateName The template name.
 * @param values The values object.
 *
 * @returns Every value path.
 */
export function getValuePaths(templateName: string, values: any) {
  // Create list of paths
  const paths: string[] = [];

  // If template name contains an array, add a path for each item
  if (templateName.includes('.$.')) {
    // Create recusive function to add path of each array item
    const addArrayItemPaths = (templateName: string, parentPath?: string) => {
      // Get präfix path and suffix paths
      const [präfixPath, ...suffixPaths] = templateName.split('.$.');

      // Create path to array value
      const arrayPath = parentPath ? `${parentPath}.${präfixPath}` : präfixPath;

      // Get array by path
      const array = getPathObject(
        arrayPath.split('.'),
        templateName.split('.'),
        values
      );

      // Add value path of each array item
      for (let index = 0; index < array.length; index++) {
        // Create path to index value
        const indexPath = `${arrayPath}.${index}`;

        // Continue execution if it is an nested array
        if (suffixPaths.length > 1) {
          addArrayItemPaths(suffixPaths.join('.$.'), indexPath);

          // Otherwise add final array path
        } else {
          paths.push(`${indexPath}.${suffixPaths[0]}`);
        }
      }
    };

    // Add path of each array item to list
    addArrayItemPaths(templateName);

    // Otherwise just add current path
  } else {
    paths.push(templateName);
  }

  // Return list of paths
  return paths;
}
