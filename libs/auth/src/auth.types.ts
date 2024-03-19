import { TokenType } from './auth.constants';

export type JwtPayload = {
  type: string;
  iat: number;
  exp: number;
  sub: string;
};

export type AuthRequest = {
  id: string;
  type: TokenType;
};
