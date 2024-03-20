import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { UserPersistedEventHandler } from '@app/user/domains/events/user-persisted/user-persisted.event-handler';
import { EventsHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { MoviePersistedEvent } from './movie-persisted.event';

@EventsHandler(MoviePersistedEvent)
export class MoviePersistedEventHandler extends EventHandlerBase<MoviePersistedEvent> {
  constructor(
    @InjectPinoLogger(UserPersistedEventHandler.name)
    readonly logger: PinoLogger,
  ) {
    super(logger);
  }

  async handleEvent(event: MoviePersistedEvent): Promise<void> {
    this.logger.info(
      event,
      `Movie with the title '${event.props.title}' has been persisted.`,
    );

    // TODO: Publish to RabbitMQ to be persisted in Neo4j
  }
}
