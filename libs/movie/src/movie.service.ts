import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IMovieMongoReadRepository } from './interfaces/movie.mongo-read-repository.interface';
import { IMovieService } from './interfaces/movie.service.interface';
import { MOVIE_MONGO_READ_REPOSITORY } from './movie.constants';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    @InjectPinoLogger(MovieService.name) readonly logger: PinoLogger,
    @Inject(MOVIE_MONGO_READ_REPOSITORY)
    readonly movieMongoReadRepository: IMovieMongoReadRepository,
  ) {}

  async getAllIds(): Promise<string[]> {
    return this.movieMongoReadRepository.getAllIds();
  }

  async countAll(): Promise<number> {
    return this.movieMongoReadRepository.countAll();
  }
}
