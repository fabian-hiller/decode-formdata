import { describe, expect, test } from 'vitest';
import { getFieldBoolean } from './getFieldBoolean.ts';

describe('getFieldBoolean', () => {
  test('should decode booleans', () => {
    // Emtpy string
    expect(getFieldBoolean('')).toBeNull();

    // "null" string
    expect(getFieldBoolean('null')).toBeNull();

    // "undefined" string
    expect(getFieldBoolean('undefined')).toBeUndefined();

    // "true" string
    expect(getFieldBoolean('true')).toBe(true);

    // "false" string
    expect(getFieldBoolean('false')).toBe(false);

    // "1" string
    expect(getFieldBoolean('1')).toBe(true);

    // "0" string
    expect(getFieldBoolean('0')).toBe(false);

    // "on" string
    expect(getFieldBoolean('on')).toBe(true);

    // "off" string
    expect(getFieldBoolean('off')).toBe(false);

    // Otherwise
    expect(getFieldBoolean('test')).toBe(true);
  });
});
