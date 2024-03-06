import { FollowCodes } from '@app/follow/follow.constants';
import { IdResult } from '@app/shared/results/id.result';

export class CreateFollowResult extends IdResult {
  code = FollowCodes.CREATED;
  message = 'Follow Created';

  constructor(public readonly id: string) {
    super({ id });
  }
}
