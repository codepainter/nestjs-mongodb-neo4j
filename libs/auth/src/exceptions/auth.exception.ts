import { ExceptionBase } from '@app/shared/exceptions/exception.base';

import { AuthErrorCodes } from '../auth.constants';

export class AuthUnauthorizedException extends ExceptionBase {
  public readonly code = AuthErrorCodes.UNAUTHORIZED;
  static readonly message = 'Unauthorized';

  constructor(metadata?: unknown) {
    super(AuthUnauthorizedException.message, metadata);
  }
}
