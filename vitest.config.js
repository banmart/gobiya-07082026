import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    // RLS tests talk to a real Supabase project over the network. The default
    // 5s timeout is not enough for user creation plus sign-in round trips.
    testTimeout: 30000,
    include: ['tests/**/*.test.js'],
  },
});
