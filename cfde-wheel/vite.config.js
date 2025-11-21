import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './index.js',
      name: 'CFDEWheel',
      fileName: 'cfde-wheel',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        // Bundle all dependencies
        inlineDynamicImports: true,
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});

