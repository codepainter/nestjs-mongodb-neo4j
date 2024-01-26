import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  env: process.env.NODE_ENV,
  uri: process.env.MONGO_DATABASE_URI,
}));
