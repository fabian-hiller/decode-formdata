import { describe, expect, test } from 'vitest';
import { decode } from './decode.ts';

describe('decode', () => {
  test('should decode strings', () => {
    const formData = new FormData();
    formData.append('string', 'hello');
    expect(decode(formData)).toEqual({ string: 'hello' });
  });

  test('should decode boolens', () => {
    const formData = new FormData();
    formData.append('true', 'true');
    expect(decode(formData, { booleans: ['true', 'false'] })).toEqual({
      true: true,
      false: false,
    });
  });

  test('should decode numbers', () => {
    const formData = new FormData();
    formData.append('integer', '123');
    formData.append('integer_2', '123');
    formData.append('float', '0.123');
    formData.append('signed', '-123');
    expect(
      decode(formData, {
        numbers: ['integer', 'integer_2', 'float', 'signed'],
      })
    ).toEqual({
      integer: 123,
      integer_2: 123,
      float: 0.123,
      signed: -123,
    });
  });

  test('should decode dates', () => {
    const formData = new FormData();
    formData.append('date', '2023-10-04');
    formData.append('datetime', '2023-10-04T02:52');
    formData.append('week', '2023-W40');
    formData.append('time', '02:52');
    formData.append('timeseconds', '02:52:12');
    formData.append('iso', '2023-10-04T02:52:12.358Z');
    expect(
      decode(formData, {
        dates: ['date', 'datetime', 'week', 'time', 'timeseconds', 'iso'],
      })
    ).toEqual({
      date: new Date('2023-10-04T00:00:00.000Z'),
      datetime: new Date('2023-10-04T02:52:00.000Z'),
      week: new Date('2023-10-01T00:00:00.000Z'),
      time: new Date('1970-01-01T02:52:00.000Z'),
      timeseconds: new Date('1970-01-01T02:52:12.000Z'),
      iso: new Date('2023-10-04T02:52:12.358Z'),
    });
  });

  test('should decode files', () => {
    const formData = new FormData();
    const file = new File(['hello'], 'hello.txt');
    formData.append('file', file);
    expect(decode(formData, { files: ['file'] })).toEqual({ file });
  });

  test('should decode indexed arrays', () => {
    const formData = new FormData();
    formData.append('array.0', 'index_0');
    formData.append('array.1', 'index_1');
    formData.append('array.2', 'index_2');
    expect(decode(formData, { arrays: ['array'] })).toEqual({
      array: ['index_0', 'index_1', 'index_2'],
    });
  });

  test('should decode non-indexed arrays', () => {
    const formData = new FormData();
    formData.append('array', 'index_0');
    formData.append('array', 'index_1');
    formData.append('array', 'index_2');
    expect(
      decode(formData, {
        arrays: ['array'],
      })
    ).toEqual({
      array: ['index_0', 'index_1', 'index_2'],
    });
  });

  test('should decode numbers in array', () => {
    const formData = new FormData();
    formData.append('array.0', '111');
    formData.append('array.1', '222');
    formData.append('array.2', '333');
    expect(
      decode(formData, { arrays: ['array'], numbers: ['array.$'] })
    ).toEqual({
      array: [111, 222, 333],
    });
  });

  test('should decode objects', () => {
    const formData = new FormData();
    formData.append('nested.string', 'hello');
    expect(decode(formData)).toEqual({
      nested: { string: 'hello' },
    });
  });

  test('should decode nested arrays', () => {
    const formData = new FormData();
    formData.append('nested.0.array.0', 'index_0');
    formData.append('nested.0.array.1', 'index_1');
    formData.append('nested.0.array.2', 'index_2');
    expect(
      decode(formData, {
        arrays: ['nested.$.array', 'empty.array'],
      })
    ).toEqual({
      nested: [{ array: ['index_0', 'index_1', 'index_2'] }],
      empty: { array: [] },
    });
  });

  test('should transform value', () => {
    const formData = new FormData();
    formData.append('string', 'hello');
    expect(decode(formData, ({ input }) => input + '123')).toEqual({
      string: 'hello123',
    });
  });
});
