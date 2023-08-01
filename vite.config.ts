import 'dotenv/config';
import {config} from 'dotenv';

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const {VITE_ENV} = process.env;

if (VITE_ENV !== 'production' && VITE_ENV !== 'development' && VITE_ENV !== undefined)
  throw new Error(`Expected valid VITE_ENV, encountered "${String(VITE_ENV)}".`);

config({path: path.resolve(`.env.${VITE_ENV || 'production'}`)});

const VITE_SITE_BASE_NAME = process.env.VITE_SITE_BASE_NAME;

// https://vitejs.dev/config/
export default defineConfig({
  base: VITE_SITE_BASE_NAME,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
})
