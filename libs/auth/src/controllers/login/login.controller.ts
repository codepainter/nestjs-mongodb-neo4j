import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { LoginCommand } from '@app/auth/commands/login/login.command';
import { LoginRequestBodyDto } from '@app/auth/dtos/login.request-body.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { apiNotFoundResponseSchema } from './not-found.schema';
import { apiOkResponseSchema } from './ok.schema';
import { apiUnauthorizedResponse } from './unauthorized.schema';

@Controller()
export class LoginController {
  constructor(
    @InjectPinoLogger(LoginController.name) private readonly logger: PinoLogger,
    readonly commandBus: CommandBus,
  ) {}

  @Post('auth.login')
  @HttpCode(HttpStatus.OK)
  @ApiTags('auth')
  @ApiOperation({
    operationId: 'auth.login',
    summary: 'Login',
    description: 'Login',
  })
  @ApiOkResponse(apiOkResponseSchema)
  @ApiNotFoundResponse(apiNotFoundResponseSchema)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  login(@Body() body: LoginRequestBodyDto) {
    this.logger.trace('LoginController.login()');
    this.logger.debug({ body }, 'Body');

    const command = new LoginCommand(body);

    return this.commandBus.execute(command);
  }
}
