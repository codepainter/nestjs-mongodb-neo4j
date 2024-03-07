import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AUTH_SERVICE } from '@app/auth/auth.constants';
import { AuthService } from '@app/auth/auth.service';
import { LoginResult } from '@app/auth/controllers/login/login.result';
import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler extends CommandHandlerBase<
  LoginCommand,
  LoginResult
> {
  constructor(
    @InjectPinoLogger(LoginCommandHandler.name)
    readonly logger: PinoLogger,
    @Inject(AUTH_SERVICE) readonly authService: AuthService,
  ) {
    super(logger);
  }

  async handleCommand(command: LoginCommand): Promise<LoginResult> {
    const result = await this.authService.login(command.props.user);
    return new LoginResult(result);
  }
}
