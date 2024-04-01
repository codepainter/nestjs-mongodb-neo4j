import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { MONGODB_CONNECTION } from '@app/database/mongodb';
import {
  MovieDocument,
  MovieModel,
  MovieSchema,
} from '@app/database/mongodb/schemas/movie.schema';
import { InjectConnection } from '@nestjs/mongoose';

import { IMovieMongoReadRepository } from '../interfaces/movie.mongo-read-repository.interface';
import { MOVIE_MODEL } from '../movie.constants';
import { MovieVM } from '../vms/movie.vm';

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

    const movies = await this.model.find().sort({ id: 'asc' }).exec();

    return movies.map((movie) => movie.id);
  }

  async countAll(): Promise<number> {
    this.logger.trace('countAll()');

    const count = await this.model.countDocuments().exec();
    this.logger.debug({ count }, 'count');

    return count;
  }

  async getAll(page?: number, limit?: number): Promise<MovieVM[]> {
    this.logger.trace('getAll()');

    let query = this.model.find().sort({ id: 'asc' });

    if (page && limit) {
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const movies = await query.exec();

    return movies.map(this.toVM);
  }

  private toVM(doc: MovieDocument): MovieVM {
    return new MovieVM({
      id: doc.id,
      title: doc.title,
    });
  }
}
