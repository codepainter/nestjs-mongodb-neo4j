import { ResultBase } from '@app/shared/results/result.base';

import { IdVM } from '../vms/id.vm';

export class IdResult extends ResultBase<IdVM> {
  code = 'GENERIC.ID_SUCCESS';
  message = 'Id Success';

  constructor(props: IdVM) {
    super(props);
  }
}
