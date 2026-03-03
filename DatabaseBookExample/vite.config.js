import {defineConfig} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      exclude: [
        'src/server.js',
        'vite.config.js',
      ],
    },
  },
});
