import { AuthCodes } from '@app/auth/auth.constants';
import { AuthVM } from '@app/auth/vms/auth.vm';
import { ResultBase } from '@app/shared/results/result.base';

export class LoginResult extends ResultBase<AuthVM> {
  readonly code = AuthCodes.LOGIN_SUCCESS;
  readonly message = 'Login Success';

  constructor(props: AuthVM) {
    super(props);
  }
}
