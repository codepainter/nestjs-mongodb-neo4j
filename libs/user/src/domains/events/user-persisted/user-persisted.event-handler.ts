import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserNode } from '@app/database/neo4j/nodes/user.node';
import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { IUserNeo4jWriteRepository } from '@app/user/interfaces/user.neo4j.write-repository';
import { USER_NEO4J_WRITE_REPOSITORY } from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { EventBus, EventsHandler } from '@nestjs/cqrs';

import { UserNodeCreatedEvent } from '../user-node-created/user-node-created.event';
import { UserPersistedEvent } from './user-persisted.event';

@EventsHandler(UserPersistedEvent)
export class UserPersistedEventHandler extends EventHandlerBase<UserPersistedEvent> {
  constructor(
    @InjectPinoLogger(UserPersistedEventHandler.name)
    readonly logger: PinoLogger,
    @Inject(USER_NEO4J_WRITE_REPOSITORY)
    readonly neo4jWriteRepository: IUserNeo4jWriteRepository,
    private eventBus: EventBus,
  ) {
    super(logger);
  }

  async handleEvent(event: UserPersistedEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    this.logger.info(
      event,
      `User with email: ${event.props.email} (${event.props.id}) has been persisted.`,
    );

    const userNode = new UserNode({
      id: event.props.id,
      name: event.props.name,
      email: event.props.email,
    });
    // Persist to Neo4j
    await this.neo4jWriteRepository.createNode(userNode);

    return this.eventBus.publish(new UserNodeCreatedEvent(event.props));
  }
}
