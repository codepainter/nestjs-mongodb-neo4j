import * as dotenv from 'dotenv';
import { join, resolve } from 'path';
import { DataSource } from 'typeorm';

import { Migrations } from './migrations';

dotenv.config({
  path:
    process.env.NODE_ENV !== 'production'
      ? resolve(join(process.cwd(), 'apps/api-service', '.env'))
      : undefined,
});

export const ApiDataSource = new DataSource({
  type: 'postgres',
  url: process.env.PG_DATABASE_URL,
  migrations: Migrations,
});
