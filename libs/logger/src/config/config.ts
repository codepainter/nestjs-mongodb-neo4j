import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  env: process.env.NODE_ENV,
  level: process.env.LOG_LEVEL,
}));
