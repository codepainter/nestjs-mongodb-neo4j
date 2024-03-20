import { AddMovieResult } from '@app/movie/controllers/add-movie/add-movie.result';
import { MovieAggregateFactory } from '@app/movie/domains/movie.aggregate-factory';
import { MOVIE_AGGREGATE_FACTORY } from '@app/movie/movie.constants';
import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AddMovieCommand } from './add-movie.command';

@CommandHandler(AddMovieCommand)
export class AddMovieCommandHandler extends CommandHandlerBase<AddMovieCommand> {
  constructor(
    @InjectPinoLogger(AddMovieCommandHandler.name)
    readonly logger: PinoLogger,
    @Inject(MOVIE_AGGREGATE_FACTORY) readonly factory: MovieAggregateFactory,
  ) {
    super(logger);
  }

  async handleCommand(command: AddMovieCommand): Promise<any> {
    const newMovie = this.factory.create({
      title: command.props.title,
    });

    newMovie.commit();

    return new AddMovieResult(newMovie.props().id);
  }
}
