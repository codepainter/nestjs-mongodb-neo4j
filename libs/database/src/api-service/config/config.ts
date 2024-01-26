import { registerAs } from '@nestjs/config';

export default registerAs('api-mongoose', () => ({
  env: process.env.NODE_ENV,
  uri: process.env.MONGO_DATABASE_URI,
}));
