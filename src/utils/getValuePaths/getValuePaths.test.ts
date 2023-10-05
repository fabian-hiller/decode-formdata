import { describe, expect, test } from 'vitest';
import { getValuePaths } from './getValuePaths.ts';

describe('getValuePaths', () => {
  test('should value paths', () => {
    expect(getValuePaths('value', {})).toEqual(['value']);
    expect(
      getValuePaths('deeply.$.nested.$.value', {
        deeply: [
          {
            nested: [
              {
                value: 'value',
              },
              {
                value: 'value',
              },
            ],
          },
          {
            nested: [
              {
                value: 'value',
              },
              {
                value: 'value',
              },
            ],
          },
        ],
      })
    ).toEqual([
      'deeply.0.nested.0.value',
      'deeply.0.nested.1.value',
      'deeply.1.nested.0.value',
      'deeply.1.nested.1.value',
    ]);
  });
});
