import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserNode } from '@app/database/neo4j/nodes/user.node';
import {
  Exchange,
  Queue,
  RoutingKey,
} from '@app/queue/rabbitmq/rabbitmq.constants';
import { IUserNeo4jWriteRepository } from '@app/user/interfaces/user.neo4j.write-repository';
import { USER_NEO4J_WRITE_REPOSITORY } from '@app/user/user.constants';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { UserNodeCreatedEvent } from '../../events/user-node-created/user-node-created.event';
import { UserPersistedMessage } from './user-persisted.message';

@Injectable()
export class UserPersistedMessageHandler {
  constructor(
    @InjectPinoLogger(UserPersistedMessageHandler.name)
    readonly logger: PinoLogger,
    @Inject(USER_NEO4J_WRITE_REPOSITORY)
    readonly neo4jWriteRepository: IUserNeo4jWriteRepository,
    readonly eventBus: EventBus,
  ) {}

  @RabbitRPC({
    exchange: Exchange.NEO4J_EXCHANGE,
    routingKey: RoutingKey.NEO4J_USER_PERSISTED,
    queue: Queue.NEO4J_QUEUE,
  })
  public async handleMessage(message: UserPersistedMessage) {
    this.logger.trace('handleMessage()');
    this.logger.debug({ message }, 'message');

    const userNode = new UserNode({
      id: message.props.id,
      name: message.props.name,
      email: message.props.email,
      createdAt: new Date(message.props.createdAt),
    });
    this.logger.debug({ userNode }, 'userNode');
    await this.neo4jWriteRepository.createNode(userNode);
    this.eventBus.publish(new UserNodeCreatedEvent(userNode));

    return new Nack();
  }
}
