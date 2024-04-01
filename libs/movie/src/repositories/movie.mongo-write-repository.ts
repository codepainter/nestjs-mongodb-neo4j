import { MONGODB_CONNECTION } from '@app/database/mongodb';
import {
  MovieModel,
  MovieSchema,
} from '@app/database/mongodb/schemas/movie.schema';
import { Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { MovieProps } from '../domains/movie.aggregate';
import { MovieAggregateFactory } from '../domains/movie.aggregate-factory';
import { MOVIE_AGGREGATE_FACTORY, MOVIE_MODEL } from '../movie.constants';
import { DuplicateMovieException } from '../exceptions/movie.exceptions';

export class MovieMongoWriteRepository {
  private model: MovieModel;

  constructor(
    @InjectPinoLogger(MovieMongoWriteRepository.name)
    readonly logger: PinoLogger,
    @InjectConnection(MONGODB_CONNECTION) readonly connection: Connection,
    @Inject(MOVIE_AGGREGATE_FACTORY) readonly factory: MovieAggregateFactory,
  ) {
    this.model = this.connection.model(MOVIE_MODEL, MovieSchema);
  }

  async create(props: MovieProps): Promise<void> {
    try {
      await this.model.create(props);
    } catch (error) {
      throw new DuplicateMovieException();
    }
  }
}
