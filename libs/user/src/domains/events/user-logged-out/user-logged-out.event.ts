import { EventBase } from '@app/shared/cqrs/event.base';

type UserLoggedOutEventProps = {
  id: string;
  email: string;
};

export class UserLoggedOutEvent extends EventBase<UserLoggedOutEventProps> {
  constructor(props: UserLoggedOutEventProps) {
    super(props);
  }
}
