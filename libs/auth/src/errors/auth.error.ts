import { ExceptionBase } from '@app/shared/exceptions/exception.base';

import { AuthErrorCodes } from '../auth.constants';

export class InvalidPasswordException extends ExceptionBase {
  public readonly code = AuthErrorCodes.WRONG_CREDENTIAL;
  static readonly message = 'Wrong Credential';

  constructor(metadata?: unknown) {
    super(InvalidPasswordException.message, metadata);
  }
}

export class EmailOrPhoneRequiredException extends ExceptionBase {
  public readonly code = AuthErrorCodes.EMAIL_OR_PHONE_REQUIRED;
  static readonly message = 'Email or Phone Required';

  constructor(metadata?: unknown) {
    super(EmailOrPhoneRequiredException.message, metadata);
  }
}

export class JwtAuthGuardException extends ExceptionBase {
  public readonly code = AuthErrorCodes.JWT_ERROR;
  static readonly message = 'JWT Error';

  constructor(metadata?: unknown) {
    super(JwtAuthGuardException.message, metadata);
  }
}

export class JwtInvalidatedException extends ExceptionBase {
  public readonly code = AuthErrorCodes.JWT_INVALIDATED;
  static readonly message = 'JWT Invalidated';

  constructor(metadata?: unknown) {
    super(JwtInvalidatedException.message, metadata);
  }
}
