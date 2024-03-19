import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
}));
