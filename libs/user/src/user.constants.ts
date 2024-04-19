export const USER_AGGREGATE_FACTORY = 'USER_AGGREGATE_FACTORY';
export const USER_WRITE_REPOSITORY = 'USER_WRITE_REPOSITORY';
export const USER_READ_REPOSITORY = 'USER_READ_REPOSITORY';
export const USER_NEO4J_WRITE_REPOSITORY = 'USER_NEO4J_WRITE_REPOSITORY';
export const USER_SERVICE = 'USER_SERVICE';

export enum UserCodes {
  REGISTERED = 'USER.REGISTERED',
  DETAILS = 'USER.DETAILS',
}

export enum UserErrorCodes {
  NOT_FOUND = 'USER.NOT_FOUND',
  DUPLICATE_KEY = 'USER.DUPLICATE_KEY',
}