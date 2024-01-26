import { ResultBase } from '@app/shared/results/result.base';

import { HealthCodes } from '../health.codes';

export class HealthResultProps {
  readonly status: string;
  readonly info?: object;
  readonly error?: object;
  readonly details: object;

  constructor(props: HealthResultProps) {
    Object.assign(this, props);
  }
}

export class HealthResult extends ResultBase<HealthResultProps> {
  readonly code = HealthCodes.CHECK_SUCCESS;
  readonly message = 'Health Check Successful';

  constructor(props: HealthResultProps) {
    super(props);
  }
}
