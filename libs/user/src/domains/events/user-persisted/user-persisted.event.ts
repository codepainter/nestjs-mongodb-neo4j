import { EventBase } from '@app/shared/cqrs/event.base';

import { UserProps } from '../../user.aggregate';

type UserPersistedEventProps = UserProps;

export class UserPersistedEvent extends EventBase<UserPersistedEventProps> {
  constructor(props: UserPersistedEventProps) {
    super(props);
  }
}
