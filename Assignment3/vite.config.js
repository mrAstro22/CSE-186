/*
#######################################################################
#
# Copyright (C) 2024-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################

#######################################################################
#######               DO NOT MODIFY THIS FILE               ###########
#######################################################################
*/
import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    coverage: {
      exclude: [
        'dist',
        'src/main.jsx', 
        'eslint.config.js', 
        'vite.config.js'
      ],
    },
  },
});
