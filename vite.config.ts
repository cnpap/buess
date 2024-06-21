// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { maPrisma } from './src/utils/facade-init';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';
import {ViteserPlugin} from 'viteser'

const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');
const isTest = env.NODE_ENV === 'test';

maPrisma()

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig(() => {
  const plugins = [];
  if (!isTest) {
    plugins.push(ViteserPlugin())
  }
  return ({
    plugins: [
      ...plugins,
      react(),
      VitePWA({
        manifest,
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        // switch to "true" to enable sw on development
        devOptions: {
          enabled: false,
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      root: path.resolve(__dirname, './src'),
    },
    optimizeDeps: {
      include: [
        '@storybook/blocks',
        '@mdx-js/react'
      ]
    },
    build: {
      rollupOptions: {
        external: [
          'node:assert',
          'node:crypto',
          'node:util',
          'fs',
          'path',
          'os'
        ]
      }
    }
  })
});
