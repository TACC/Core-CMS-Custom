import eslint from '@rollup/plugin-eslint';
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({
    css: { preprocessorOptions: { scss: { charset: false } } },
    build: {
      outDir: 'dist',
      lib: {
        entry: resolve(__dirname, 'src/components/library.tsx'),
        name: 'APCDComponents',
        fileName: 'apcd-components'
    }
  },
    resolve: {
      alias: {
        'shared-components': resolve(__dirname, 'src/shared-components'),
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
        visualizer() as PluginOption
      ],
})