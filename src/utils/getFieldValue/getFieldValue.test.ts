import { describe, expect, test } from 'vitest';
import { getFieldValue } from './getFieldValue.ts';

describe('getFieldValue', () => {
  test('should decode values', () => {
    // Booleans
    const booleans = ['boolean', 'nested.$.boolean'];
    expect(getFieldValue({ booleans }, 'boolean', '')).toBeNull();
    expect(getFieldValue({ booleans }, 'boolean', 'null')).toBeNull();
    expect(getFieldValue({ booleans }, 'boolean', 'undefined')).toBeUndefined();
    expect(getFieldValue({ booleans }, 'boolean', 'on')).toBe(true);
    expect(getFieldValue({ booleans }, 'boolean', 'off')).toBe(false);
    expect(getFieldValue({ booleans }, 'nested.$.boolean', 'true')).toBe(true);
    expect(getFieldValue({ booleans }, 'boolean', 'false')).toBe(false);
    expect(getFieldValue({ booleans }, 'boolean', '1')).toBe(true);
    expect(getFieldValue({ booleans }, 'boolean', '0')).toBe(false);

    // Dates
    const dates = ['date', 'nested.$.date'];
    expect(getFieldValue({ dates }, 'date', '')).toBeNull();
    expect(getFieldValue({ dates }, 'date', 'null')).toBeNull();
    expect(getFieldValue({ dates }, 'date', 'undefined')).toBeUndefined();
    expect(getFieldValue({ dates }, 'date', '2023-10-04')).toStrictEqual(
      new Date('2023-10-04T00:00:00.000Z')
    );
    expect(
      getFieldValue({ dates }, 'nested.$.date', '2023-10-04')
    ).toStrictEqual(new Date('2023-10-04T00:00:00.000Z'));

    // Numbers
    const numbers = ['number', 'nested.$.number', 'date'];
    expect(getFieldValue({ numbers }, 'number', '')).toBeNull();
    expect(getFieldValue({ numbers }, 'number', 'null')).toBeNull();
    expect(getFieldValue({ numbers }, 'number', 'undefined')).toBeUndefined();
    expect(getFieldValue({ numbers }, 'number', '123')).toBe(123);
    expect(getFieldValue({ numbers }, 'number', '-123')).toBe(-123);
    expect(getFieldValue({ numbers }, 'number', '1.23')).toBe(1.23);
    expect(getFieldValue({ numbers }, 'number', '-1.23')).toBe(-1.23);
    expect(getFieldValue({ numbers }, 'number', 'abc')).toBeNaN();
    expect(getFieldValue({ numbers }, 'nested.$.number', '123')).toBe(123);
    expect(getFieldValue({ numbers }, 'date', 'Invalid Date')).toBeNaN();
    expect(getFieldValue({ numbers }, 'date', '2023-10-04')).toBe(
      1696377600000
    );

    // Otherwise
    expect(getFieldValue({}, 'string', 'hello')).toBe('hello');
    expect(getFieldValue({}, 'nested.$.string', 'hello')).toBe('hello');
  });
});
