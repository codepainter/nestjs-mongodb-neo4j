import { registerAs } from '@nestjs/config';

export default registerAs('api-postgres', () => ({
  env: process.env.NODE_ENV,
  url: process.env.PG_DATABASE_URL,
}));
