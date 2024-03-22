import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Inject, Injectable } from '@nestjs/common';

import { IMovieMongoReadRepository } from './interfaces/movie.mongo-read-repository.interface';
import { IMovieNeo4jReadRepository } from './interfaces/movie.neo4j-read-repository.interface';
import { IMovieService } from './interfaces/movie.service.interface';
import {
  MOVIE_MONGO_READ_REPOSITORY,
  MOVIE_NEO4J_READ_REPOSITORY,
} from './movie.constants';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    @InjectPinoLogger(MovieService.name) readonly logger: PinoLogger,
    @Inject(MOVIE_MONGO_READ_REPOSITORY)
    readonly movieMongoReadRepository: IMovieMongoReadRepository,
    @Inject(MOVIE_NEO4J_READ_REPOSITORY)
    readonly movieNeo4jReadRepository: IMovieNeo4jReadRepository,
  ) {}

  async getAllMongoIds(): Promise<string[]> {
    return this.movieMongoReadRepository.getAllIds();
  }

  async countAllMongo(): Promise<number> {
    return this.movieMongoReadRepository.countAll();
  }

  async getAllNeo4jIds(): Promise<string[]> {
    return this.movieNeo4jReadRepository.getAllIds();
  }

  async countAllNeo4j() {
    return this.movieNeo4jReadRepository.countAll();
  }

  async syncData(): Promise<void> {
    this.logger.trace('syncData');
    // const mongoMovies = await this.movieMongoReadRepository.getAll();
    // this.logger.debug({ mongoMovies }, 'mongoMovies');
  }
}
