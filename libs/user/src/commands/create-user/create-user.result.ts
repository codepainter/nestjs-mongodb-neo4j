import { IdResult } from '@app/shared/results/id.result';
import { UserCodes } from '@app/user/user.constants';

export class CreateUserResult extends IdResult {
  code = UserCodes.REGISTERED;
  message = 'User Registered';

  constructor(public readonly id: string) {
    super({ id });
  }
}
