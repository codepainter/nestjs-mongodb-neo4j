export const AUTH_SERVICE = 'AUTH_SERVICE';

export enum AuthCodes {
  LOGGED_IN = 'LOGGED_IN',
  PROFILE = 'PROFILE',
}

export enum AuthErrorCodes {
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
