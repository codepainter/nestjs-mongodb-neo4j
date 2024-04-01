import { ExceptionBase } from '@app/shared/exceptions/exception.base';

import { FollowErrorCodes } from '../follow.constants';

export class DuplicateFollowException extends ExceptionBase {
  public readonly code = FollowErrorCodes.ALREADY_FOLLOWED;
  static readonly message = 'Already Followed';

  constructor(metadata?: unknown) {
    super(DuplicateFollowException.message, metadata);
  }
}
