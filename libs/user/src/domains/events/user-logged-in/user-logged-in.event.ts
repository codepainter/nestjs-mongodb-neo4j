import { EventBase } from '@app/shared/cqrs/event.base';

type UserLoggedInEventProps = {
  id: string;
  email: string;
};

export class UserLoggedInEvent extends EventBase<UserLoggedInEventProps> {
  constructor(props: UserLoggedInEventProps) {
    super(props);
  }
}
