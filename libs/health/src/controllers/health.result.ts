import { ResultBase } from '@app/shared/results/result.base';

import { HealthCodes } from '../health.codes';

type HealthResultProps = {
  status: string;
  info?: object;
  error?: object;
  details: object;
};

export class HealthResult extends ResultBase<HealthResultProps> {
  readonly code = HealthCodes.CHECK_SUCCESS;
  readonly message = 'Health Check Successful';

  constructor(props: HealthResultProps) {
    super(props);
  }
}
