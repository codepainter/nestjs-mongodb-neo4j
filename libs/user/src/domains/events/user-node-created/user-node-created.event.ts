import { UserNode } from '@app/database/neo4j/nodes/user.node';
import { EventBase } from '@app/shared/cqrs/event.base';

type UserNodeCreatedEventProps = UserNode;

export class UserNodeCreatedEvent extends EventBase<UserNodeCreatedEventProps> {
  constructor(props: UserNodeCreatedEventProps) {
    super(props);
  }
}
