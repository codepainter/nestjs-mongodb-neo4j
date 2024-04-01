import { MOVIE_MONGO_WRITE_REPOSITORY } from '@app/movie/movie.constants';
import { MovieMongoWriteRepository } from '@app/movie/repositories/movie.mongo-write-repository';
import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { Inject } from '@nestjs/common';
import { EventBus, EventsHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { MoviePersistedEvent } from '../movie-persisted/movie-persisted.event';
import { MovieCreatedEvent } from './movie-created.event';

@EventsHandler(MovieCreatedEvent)
export class MovieCreatedEventHandler extends EventHandlerBase<MovieCreatedEvent> {
  constructor(
    @InjectPinoLogger(MovieCreatedEventHandler.name)
    readonly logger: PinoLogger,
    @Inject(MOVIE_MONGO_WRITE_REPOSITORY)
    readonly movieWriteRepo: MovieMongoWriteRepository,
    private eventBus: EventBus,
  ) {
    super(logger);
  }

  async handleEvent(event: MovieCreatedEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    this.logger.info(
      event,
      `Movie with title '${event.props.title}' has been created.`,
    );

    // Persist to mongoDB
    await this.movieWriteRepo.create({
      id: event.props.id,
      title: event.props.title,
      createdAt: event.props.createdAt,
      updatedAt: event.props.updatedAt,
    });

    return this.eventBus.publish(new MoviePersistedEvent(event.props));
  }
}
