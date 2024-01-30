import { EventBase } from '@app/shared/cqrs/event.base';

import { UserProps } from '../../user.aggregate';

type UserNodeCreatedEventProps = UserProps;

export class UserNodeCreatedEvent extends EventBase<UserNodeCreatedEventProps> {
  constructor(props: UserNodeCreatedEventProps) {
    super(props);
  }
}
