import { AuthCodes } from '@app/auth/auth.constants';
import { AuthVM } from '@app/auth/vms/access-token.vm';
import { ResultBase } from '@app/shared/results/result.base';

export class LoginResult extends ResultBase<AuthVM> {
  readonly code = AuthCodes.LOGGED_IN;
  readonly message = 'Logged-In';

  constructor(props: AuthVM) {
    super(props);
  }
}
