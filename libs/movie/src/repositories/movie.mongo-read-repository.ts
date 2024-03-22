import { MONGODB_CONNECTION } from '@app/database/mongodb';
import {
  MovieModel,
  MovieSchema,
} from '@app/database/mongodb/schemas/movie.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IMovieMongoReadRepository } from '../interfaces/movie.mongo-read-repository.interface';
import { MOVIE_MODEL } from '../movie.constants';

export class MovieMongoReadRepository implements IMovieMongoReadRepository {
  private model: MovieModel;

  constructor(
    @InjectPinoLogger(MovieMongoReadRepository.name)
    readonly logger: PinoLogger,
    @InjectConnection(MONGODB_CONNECTION) readonly connection: Connection,
  ) {
    this.model = this.connection.model(MOVIE_MODEL, MovieSchema);
  }

  async getAllIds(): Promise<string[]> {
    this.logger.trace('getAllIds()');

    const movies = await this.model.find().exec();

    return movies.map((movie) => movie.id);
  }

  async countAll(): Promise<number> {
    this.logger.trace('countAll()');

    const count = await this.model.countDocuments().exec();
    this.logger.debug({ count }, 'count');

    return count;
  }
}
