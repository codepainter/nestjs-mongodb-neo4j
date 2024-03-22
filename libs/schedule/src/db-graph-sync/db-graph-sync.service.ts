import { IMovieService } from '@app/movie/interfaces/movie.service.interface';
import { MOVIE_SERVICE } from '@app/movie/movie.constants';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class DbGraphSyncService {
  constructor(
    @InjectPinoLogger(DbGraphSyncService.name) readonly logger: PinoLogger,
    @Inject(MOVIE_SERVICE) readonly movieService: IMovieService,
  ) {}

  @Cron('* * * * *')
  async everyMinute() {
    this.logger.debug('Called every minute');

    // const mongoIds = await this.movieService.getAllMongoIds();
    // const neo4jIds = await this.movieService.getAllNeo4jIds();
    // this.logger.debug({ neo4jIds }, 'ids');

    const mongoCount = await this.movieService.countAllMongo();
    const neo4jCount = await this.movieService.countAllNeo4j();
    this.logger.debug({ mongoCount, neo4jCount }, 'count');

    if (mongoCount !== neo4jCount) {
      this.logger.debug('Count Difference found.');
      await this.movieService.syncData();
    }
  }
}
