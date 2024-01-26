import { ResultBase } from '@app/shared/results/result.base';
import { UserCodes } from '@app/user/user.constants';
import { UserVM } from '@app/user/vms/user.vm';

export class UserDetailsResult extends ResultBase<UserVM> {
  code = UserCodes.DETAILS;
  message = 'User details';

  constructor(props: UserVM) {
    super(props);
  }
}
