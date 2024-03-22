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

    const ids = await this.movieService.getAllIds();
    this.logger.debug({ ids }, 'ids');

    const count = await this.movieService.countAll();
    this.logger.debug({ count }, 'count');
  }
}
