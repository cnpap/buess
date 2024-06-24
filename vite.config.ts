import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';
import {ViteserPlugin} from 'viteser'
import Inspect from 'vite-plugin-inspect'
import { PrismaClient } from '@prisma/client';

const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');
const isTest = env.NODE_ENV === 'test';

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig(async () => {
  const plugins = [];
  if (!isTest) {
    plugins.push(ViteserPlugin())
  }
  if (!isTest && !(global as unknown as {storybook: boolean}).storybook && process.env.NODE_ENV === 'development') {
    // noinspection JSStringConcatenationToES6Template
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { facade } = await import('@/utils/facade');
    facade.prisma = new PrismaClient();
  } else {
    // noinspection JSStringConcatenationToES6Template
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { facade } = await import('./src/utils/facade');
    facade.prisma = new PrismaClient();
  }

  return ({
    plugins: [
      Inspect(),
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
