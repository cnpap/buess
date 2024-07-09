import { Cli } from 'kysely-codegen';
import * as process from 'node:process';
import {
  VITE_DB_DATABASE,
  VITE_DB_HOST,
  VITE_DB_PASSWORD,
  VITE_DB_PORT,
  VITE_DB_USER,
} from '@/const';

export const DATABASE_URL = `postgres://${VITE_DB_USER}:${VITE_DB_PASSWORD}@${VITE_DB_HOST}:${VITE_DB_PORT}/${VITE_DB_DATABASE}`;

void new Cli().run(['--url', DATABASE_URL]).then(() => process.exit(0));
