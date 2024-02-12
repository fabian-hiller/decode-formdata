import { describe, expect, test } from 'vitest';
import { getFieldNumber } from './getFieldNumber.ts';

describe('getFieldNumber', () => {
  test('should decode numbers', () => {
    // Emtpy string
    expect(getFieldNumber('')).toBeNull();

    // "null" string
    expect(getFieldNumber('null')).toBeNull();

    // "undefined" string
    expect(getFieldNumber('undefined')).toBeUndefined();

    // Number strings
    expect(getFieldNumber('123')).toBe(123);
    expect(getFieldNumber('-123')).toBe(-123);
    expect(getFieldNumber('1.23')).toBe(1.23);
    expect(getFieldNumber('-1.23')).toBe(-1.23);
    expect(getFieldNumber('12.3')).toBe(12.3);
    expect(getFieldNumber('-12.3')).toBe(-12.3);

    // Date string
    expect(getFieldNumber('2023-10-04')).toBe(1696377600000);
    expect(getFieldNumber('2024-02-11T21:54:10.851Z')).toBe(1707688450851);

    // Otherwise
    expect(getFieldNumber('1,234.56')).toBeNaN();
    expect(getFieldNumber('Invalid Date')).toBeNaN();
    expect(getFieldNumber('abc')).toBeNaN();
  });
});
