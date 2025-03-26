import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    isolate: false,
    coverage: {
      include: ['src'],
      exclude: ['**/index.ts', '**/types.ts', '**/*.test.ts'],
    },
  },
});
