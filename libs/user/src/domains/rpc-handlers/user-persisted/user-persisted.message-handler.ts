import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserNode } from '@app/database/neo4j/nodes/user.node';
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
    exchange: 'neo4j-exchange',
    routingKey: 'neo4j.user.persisted',
    queue: 'neo4j-queue',
  })
  public async handleMessage(message: UserPersistedMessage) {
    this.logger.trace('handleMessage()');
    this.logger.debug({ message }, 'message');

    const userNode = new UserNode({
      id: message.props.id,
      name: message.props.name,
      email: message.props.email,
      createdAt: message.props.createdAt,
    });
    await this.neo4jWriteRepository.createNode(userNode);
    this.eventBus.publish(new UserNodeCreatedEvent(userNode));

    return new Nack();
  }
}
