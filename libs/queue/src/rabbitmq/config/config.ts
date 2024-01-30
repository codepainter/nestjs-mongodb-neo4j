import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  env: process.env.NODE_ENV,
  uri: process.env.RABBITMQ_URI,
}));
