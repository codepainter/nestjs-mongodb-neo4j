import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AUTH_SERVICE } from '@app/auth/auth.constants';
import { AuthService } from '@app/auth/auth.service';
import { LoginCommand } from '@app/auth/commands/login/login.command';
import { LocalAuthGuard } from '@app/auth/guards/local.auth-guard';
import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class LoginController {
  constructor(
    @InjectPinoLogger(LoginController.name) readonly logger: PinoLogger,
    @Inject(AUTH_SERVICE) readonly authService: AuthService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('auth.login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    this.logger.trace('login()');

    const command = new LoginCommand({ user: req.user });

    return this.commandBus.execute(command);
  }
}
