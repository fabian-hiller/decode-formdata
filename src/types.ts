/**
 * Form data entry type.
 */
export type FormDataEntry = {
  path: string;
  input: File | string;
  output: boolean | Date | File | null | number | string | undefined;
};

/**
 * Form data transform type.
 */
export type FormDataTransform = (entry: FormDataEntry) => any;

/**
 * Form data info type.
 */
export type FormDataInfo = Partial<{
  arrays: string[];
  booleans: string[];
  dates: string[];
  files: string[];
  numbers: string[];
}>;
