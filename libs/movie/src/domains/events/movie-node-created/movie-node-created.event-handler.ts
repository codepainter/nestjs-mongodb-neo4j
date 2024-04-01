import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { EventsHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { MovieNodeCreatedEvent } from './movie-node-created.event';

@EventsHandler(MovieNodeCreatedEvent)
export class MovieNodeCreatedEventHandler extends EventHandlerBase<MovieNodeCreatedEvent> {
  constructor(
    @InjectPinoLogger(MovieNodeCreatedEventHandler.name)
    readonly logger: PinoLogger,
  ) {
    super(logger);
  }

  async handleEvent(event: MovieNodeCreatedEvent): Promise<void> {
    this.logger.trace('handleEvent()...');
    this.logger.info(
      event,
      `Node (:Movie {id: ${event.props.id}, title: ${event.props.title}}) has been created.`,
    );
  }
}
