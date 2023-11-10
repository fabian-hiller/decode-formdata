import { describe, expect, test } from 'vitest';
import { getFieldDate } from './getFieldDate.ts';

describe('getFieldDate', () => {
  test('should decode dates', () => {
    // Emtpy string
    expect(getFieldDate('')).toBeNull();

    // Date (yyyy-mm-dd)
    expect(getFieldDate('2023-10-04')).toEqual(
      new Date('2023-10-04T00:00:00.000Z')
    );

    // Datetime (yyyy-mm-ddThh:mm)
    expect(getFieldDate('2023-10-04T02:52')).toEqual(
      new Date('2023-10-04T02:52:00.000Z')
    );

    // Week (yyyy-Www)
    expect(getFieldDate('2023-W40')).toEqual(
      new Date('2023-10-01T00:00:00.000Z')
    );

    // Time (hh:mm)
    expect(getFieldDate('02:52')).toEqual(new Date('1970-01-01T02:52:00.000Z'));

    // Timeseconds (hh:mm:ss)
    expect(getFieldDate('02:52:12')).toEqual(
      new Date('1970-01-01T02:52:12.000Z')
    );

    // ISO timestamp
    expect(getFieldDate('2023-10-04T02:52:12.358Z')).toEqual(
      new Date('2023-10-04T02:52:12.358Z')
    );

    expect(getFieldDate('1699597055066')).toEqual(
      new Date('2023-11-10T06:17:35.066Z')
    );
  });
});
