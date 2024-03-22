import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddMovieCommandHandler } from './commands/add-movie/add-movie.command-handler';
import { AddMovieController } from './controllers/add-movie/add-movie.controller';
import { MovieCreatedEventHandler } from './domains/events/movie-created/movie-created.event-handler';
import { MovieNodeCreatedEventHandler } from './domains/events/movie-node-created/movie-node-created.event-handler';
import { MoviePersistedEventHandler } from './domains/events/movie-persisted/movie-persisted.event-handler';
import { MovieAggregateFactory } from './domains/movie.aggregate-factory';
import { MoviePersistedMessageHandler } from './domains/rpc-handlers/movie-persisted/movie-persisted.message-handler';
import {
  MOVIE_AGGREGATE_FACTORY,
  MOVIE_MONGO_READ_REPOSITORY,
  MOVIE_MONGO_WRITE_REPOSITORY,
  MOVIE_NEO4J_WRITE_REPOSITORY,
  MOVIE_SERVICE,
} from './movie.constants';
import { MovieService } from './movie.service';
import { MovieMongoReadRepository } from './repositories/movie.mongo-read-repository';
import { MovieMongoWriteRepository } from './repositories/movie.mongo-write-repository';
import { MovieNeo4jWriteRepository } from './repositories/movie.neo4j-write-repository';

const MessageHandlers = [MoviePersistedMessageHandler];

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
  MovieNodeCreatedEventHandler,
];

const Repositories: Provider[] = [
  {
    useClass: MovieMongoWriteRepository,
    provide: MOVIE_MONGO_WRITE_REPOSITORY,
  },
  {
    useClass: MovieMongoReadRepository,
    provide: MOVIE_MONGO_READ_REPOSITORY,
  },
  {
    useClass: MovieNeo4jWriteRepository,
    provide: MOVIE_NEO4J_WRITE_REPOSITORY,
  },
];

const Services: Provider[] = [
  {
    useClass: MovieService,
    provide: MOVIE_SERVICE,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [AddMovieController],
  providers: [
    ...MessageHandlers,
    ...Domains,
    ...CommandHandlers,
    ...EventHandlers,
    ...Repositories,
    ...Services,
  ],
  exports: [MOVIE_SERVICE],
})
export class MovieModule {}
