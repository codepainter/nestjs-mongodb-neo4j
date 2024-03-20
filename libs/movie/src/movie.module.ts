import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddMovieCommandHandler } from './commands/add-movie/add-movie.command-handler';
import { AddMovieController } from './controllers/add-movie/add-movie.controller';
import { MovieCreatedEventHandler } from './domains/events/movie-created/movie-created.event-handler';
import { MoviePersistedEventHandler } from './domains/events/movie-persisted/movie-persisted.event-handler';
import { MovieAggregateFactory } from './domains/movie.aggregate-factory';
import {
  MOVIE_AGGREGATE_FACTORY,
  MOVIE_MONGO_WRITE_REPOSITORY,
} from './movie.constants';
import { MovieMongoWriteRepository } from './repositories/movie.mongo-write-repository';

const Domains: Provider[] = [
  {
    useClass: MovieAggregateFactory,
    provide: MOVIE_AGGREGATE_FACTORY,
  },
];

const CommandHandlers: Provider[] = [AddMovieCommandHandler];

const EventHandlers: Provider[] = [
  MovieCreatedEventHandler,
  MoviePersistedEventHandler,
];

const Repositories: Provider[] = [
  {
    useClass: MovieMongoWriteRepository,
    provide: MOVIE_MONGO_WRITE_REPOSITORY,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [AddMovieController],
  providers: [
    ...Domains,
    ...CommandHandlers,
    ...EventHandlers,
    ...Repositories,
  ],
  exports: [],
})
export class MovieModule {}
