import { describe, expect, test } from 'vitest';
import { getPathObject } from './getPathObject.ts';

describe('getPathObject', () => {
  test('should return values argument', () => {
    const values = {};
    expect(getPathObject([], [], values)).toStrictEqual(values);
  });

  test('should return value of path', () => {
    const values = {
      deeply: {
        nested: [
          {
            object: {
              key: 'value',
            },
          },
        ],
      },
    };
    const pathKeys = ['deeply', 'nested', '0', 'object'];
    const templateKeys = ['deeply', 'nested', '$', 'object'];
    expect(getPathObject(pathKeys, templateKeys, values)).toStrictEqual({
      key: 'value',
    });
  });

  test('should supplement empty arrays and objects', () => {
    const values = {};
    const pathKeys = ['deeply', 'nested', '0', 'object'];
    const templateKeys = ['deeply', 'nested', '$', 'object'];
    expect(getPathObject(pathKeys, templateKeys, values)).toStrictEqual({});
    expect(values).toStrictEqual({
      deeply: {
        nested: [
          {
            object: {},
          },
        ],
      },
    });
  });
});
