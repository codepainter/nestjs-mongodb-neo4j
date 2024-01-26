import { ExceptionBase } from '@app/shared/exceptions/exception.base';

import { UserErrorCodes } from '../user.constants';

export class UserNotFoundException extends ExceptionBase {
  public readonly code = UserErrorCodes.NOT_FOUND;
  static readonly message = 'User Not Found';

  constructor(metadata?: unknown) {
    super(UserNotFoundException.message, metadata);
  }
}

export class DuplicateKeyException extends ExceptionBase {
  public readonly code = UserErrorCodes.DUPLICATE_KEY;
  static readonly message = 'Duplicate Key';

  constructor(metadata?: unknown) {
    super(DuplicateKeyException.message, metadata);
  }
}
