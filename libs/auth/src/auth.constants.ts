export const AUTH_SERVICE = 'AUTH_SERVICE';

export enum AuthCodes {
  LOGGED_IN = 'AUTH.LOGGED_IN',
}

export enum AuthErrorCodes {
  UNAUTHORIZED = 'AUTH.UNAUTHORIZED',
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
