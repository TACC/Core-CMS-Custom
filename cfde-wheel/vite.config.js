import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: './index.js',
      name: 'CFDEWheel',
      fileName: 'cfde-wheel',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        // To bundle all dependencies
        inlineDynamicImports: true,
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});

