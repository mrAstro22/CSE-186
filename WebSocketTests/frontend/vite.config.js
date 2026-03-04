import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    eslint(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    coverage: {
      exclude: [ 
        'src/__tests__/*', 
        'src/main.jsx', 
        'eslint.config.js', 
        'vite.config.js',
      ]
    }
  },
});
