import { AddMovieCommand } from '@app/movie/commands/add-movie/add-movie.command';
import { AddMovieRequestBodyDto } from '@app/movie/dtos/add-movie.request-body.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Controller()
export class AddMovieController {
  constructor(
    @InjectPinoLogger(AddMovieController.name)
    private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('movie.add')
  addMovie(@Body() body: AddMovieRequestBodyDto) {
    this.logger.trace('addMovie()');
    this.logger.debug({ body }, 'Body');

    const command = new AddMovieCommand(body);

    return this.commandBus.execute(command);
  }
}
