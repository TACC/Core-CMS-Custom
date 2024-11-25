import eslint from '@rollup/plugin-eslint';
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path, {resolve} from 'path';


export default defineConfig({
    css: { preprocessorOptions: { scss: { charset: false } } },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          imports: path.resolve(__dirname, 'react-assets.html'),
        },
        output: {
          entryFileNames: 'static/assets/[name].[hash].js',
          chunkFileNames: 'static/assets/[name].[hash].js',
          assetFileNames: 'static/assets/[name].[hash].[ext]'
        }
      },
  },
  resolve: {
    alias: {
      'apcd-components': resolve(__dirname, 'src/components'),
      'core-wrappers': resolve(__dirname, 'src/core-wrappers'),
      'core-components': resolve(__dirname, 'src/core-components'),
      'hooks': resolve(__dirname, 'src/hooks'),
      'utils': resolve(__dirname, 'src/utils'),
    }
  },
  server: {
    port: 3000,
    host: 'localhost',
    hmr: {
      port: 3000,
    },
  },
  plugins: [
      {...eslint({include: 'src/**/*.+(js|jsx|ts|tsx)', fix: false}), enforce: 'pre', },
      react(),
    ],
  optimizeDeps: {
      include: ['react-refresh'],
    },
})