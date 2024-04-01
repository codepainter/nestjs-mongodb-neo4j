import { SetMetadata } from '@nestjs/common';

export const REFRESH_TOKEN_REQUIRED = 'refresh-token-required';

export const RefreshTokenRequired = () =>
  SetMetadata(REFRESH_TOKEN_REQUIRED, true);
