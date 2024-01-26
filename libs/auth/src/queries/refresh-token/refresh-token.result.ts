import { AuthCodes } from '@app/auth/auth.constants';
import { AuthVM } from '@app/auth/vms/auth.vm';
import { ResultBase } from '@app/shared/results/result.base';

export class RefreshTokenQueryResult extends ResultBase<AuthVM> {
  readonly code = AuthCodes.TOKEN_REFRESHED;
  readonly message = 'Token Refreshed';

  constructor(props: AuthVM) {
    super(props);
  }
}
