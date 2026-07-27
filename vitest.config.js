import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    testTimeout: 30000,
    include: ['tests/**/*.test.js'],
  },
});
