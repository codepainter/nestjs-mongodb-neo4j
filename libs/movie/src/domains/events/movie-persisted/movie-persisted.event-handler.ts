import {
  Exchange,
  RabbitMQService,
  RABBITMQ_SERVICE,
  RoutingKey,
} from '@app/queue/rabbitmq';
import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { UserPersistedEventHandler } from '@app/user/domains/events/user-persisted/user-persisted.event-handler';
import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { MoviePersistedMessage } from '../../rpc-handlers/movie-persisted/movie-persisted.message';
import { MoviePersistedEvent } from './movie-persisted.event';

@EventsHandler(MoviePersistedEvent)
export class MoviePersistedEventHandler extends EventHandlerBase<MoviePersistedEvent> {
  constructor(
    @InjectPinoLogger(UserPersistedEventHandler.name)
    readonly logger: PinoLogger,
    @Inject(RABBITMQ_SERVICE) readonly rabbitMQService: RabbitMQService,
  ) {
    super(logger);
  }

  async handleEvent(event: MoviePersistedEvent): Promise<void> {
    this.logger.info(
      event,
      `Movie with the title '${event.props.title}' has been persisted.`,
    );

    this.rabbitMQService.publish<MoviePersistedMessage>({
      exchange: Exchange.NEO4J_EXCHANGE,
      routingKey: RoutingKey.NEO4J_MOVIE_PERSISTED,
      message: new MoviePersistedMessage({
        id: event.props.id,
        title: event.props.title,
        createdAt: event.props.createdAt,
      }),
    });
  }
}
