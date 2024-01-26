import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CreateUserCommand } from '@app/user/commands/create-user/create-user.command';
import { CreateUserRequestBodyDto } from '@app/user/dtos/create-user.request-body.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { apiOkResponseSchema } from './ok.response-schema';

@Controller()
export class CreateUserController {
  constructor(
    @InjectPinoLogger(CreateUserController.name)
    private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('user.create')
  @ApiTags('user')
  @ApiOperation({
    operationId: 'user.create',
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @ApiOkResponse(apiOkResponseSchema)
  async createUser(@Body() body: CreateUserRequestBodyDto) {
    this.logger.trace('createUser()');
    this.logger.debug({ body }, 'Body');

    const command = new CreateUserCommand(body);

    return this.commandBus.execute(command);
  }
}
