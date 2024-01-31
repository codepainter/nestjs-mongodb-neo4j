import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { RABBITMQ_SERVICE } from '@app/queue/rabbitmq/rabbitmq.constants';
import { RabbitMQService } from '@app/queue/rabbitmq/rabbitmq.service';
import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';

import { UserPersistedMessage } from '../../rpc-handlers/user-persisted/user-persisted.message';
import { UserPersistedEvent } from './user-persisted.event';

@EventsHandler(UserPersistedEvent)
export class UserPersistedEventHandler extends EventHandlerBase<UserPersistedEvent> {
  constructor(
    @InjectPinoLogger(UserPersistedEventHandler.name)
    readonly logger: PinoLogger,
    @Inject(RABBITMQ_SERVICE) readonly rabbitMQService: RabbitMQService,
  ) {
    super(logger);
  }

  async handleEvent(event: UserPersistedEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    this.logger.info(
      {
        event: {
          id: event.props.id,
          name: event.props.name,
          email: event.props.email,
          createdAt: event.props.createdAt,
        },
      },
      `User with email: ${event.props.email} (${event.props.id}) has been persisted.`,
    );

    // Publish to RabbitMQ
    this.rabbitMQService.publish<UserPersistedMessage>({
      exchange: 'neo4j-exchange',
      routingKey: 'neo4j.user.persisted',
      message: new UserPersistedMessage({
        id: event.props.id,
        name: event.props.name,
        email: event.props.email,
        createdAt: event.props.createdAt,
      }),
    });

    return;
  }
}
