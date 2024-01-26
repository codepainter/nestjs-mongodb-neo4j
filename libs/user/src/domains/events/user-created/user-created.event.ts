import { EventBase } from '@app/shared/cqrs/event.base';

type UserCreatedEventProps = {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class UserCreatedEvent extends EventBase<UserCreatedEventProps> {
  constructor(props: UserCreatedEventProps) {
    super(props);
  }
}
