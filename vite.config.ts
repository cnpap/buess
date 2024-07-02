import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';
import {ViteserPlugin} from 'viteser'
import Inspect from 'vite-plugin-inspect'
import { build, optimizeDeps, resolve, test } from './vite.option';
import tsconfigPaths from 'vite-tsconfig-paths';

const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');
const isTest = env.NODE_ENV === 'test';

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig(async () => {
  const plugins = [
    Inspect(),
  ];
  if (!isTest) {
    plugins.push(ViteserPlugin() as Plugin);
  }

  return ({
    plugins: [
      tsconfigPaths(),
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
    resolve,
    test,
    optimizeDeps,
    build
  })
});
