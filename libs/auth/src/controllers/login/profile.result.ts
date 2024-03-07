import { AuthCodes } from '@app/auth/auth.constants';
import { ResultBase } from '@app/shared/results/result.base';
import { UserVM } from '@app/user/vms/user.vm';

export class ProfileResult extends ResultBase<UserVM> {
  readonly code = AuthCodes.PROFILE;
  readonly message = 'User Profile';

  constructor(props: UserVM) {
    super(props);
  }
}
