import { SetMetadata } from '@nestjs/common';

export const ACCESS_TOKEN_REQUIRED = 'access-token-required';

export const AccessTokenRequired = () =>
  SetMetadata(ACCESS_TOKEN_REQUIRED, true);
