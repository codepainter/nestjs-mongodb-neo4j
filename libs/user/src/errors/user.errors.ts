import { ExceptionBase } from '@app/shared/exceptions/exception.base';

import { UserErrorCodes } from '../user.constants';

export class UserNotFoundException extends ExceptionBase {
  public readonly code = UserErrorCodes.NOT_FOUND;
  static readonly message = 'User Not Found';

  constructor(metadata?: unknown) {
    super(UserNotFoundException.message, metadata);
  }
}
