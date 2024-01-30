import { EventBase } from '@app/shared/cqrs/event.base';

import { UserProps } from '../../user.aggregate';

type UserCreatedEventProps = UserProps;

export class UserCreatedEvent extends EventBase<UserCreatedEventProps> {
  constructor(props: UserCreatedEventProps) {
    super(props);
  }
}
