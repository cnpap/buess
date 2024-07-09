import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import pg from 'pg';
import {
  VITE_DB_DATABASE,
  VITE_DB_HOST,
  VITE_DB_PASSWORD,
  VITE_DB_PORT,
  VITE_DB_USER,
} from '@/const';

export const ky = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      host: VITE_DB_HOST ?? 'localhost',
      port: Number(VITE_DB_PORT) ?? 5432,
      user: VITE_DB_USER ?? 'postgres',
      database: VITE_DB_DATABASE ?? 'logto',
      password: VITE_DB_PASSWORD ?? '123456',
    }),
  }),
});

export const facade = {
  kysely: ky,
} as {
  kysely: Kysely<DB>;
};
