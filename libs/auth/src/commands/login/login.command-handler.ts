import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AUTH_SERVICE } from '@app/auth/auth.constants';
import { EmailOrPhoneRequiredException } from '@app/auth/errors/auth.error';
import { IAuthService } from '@app/auth/interfaces/auth.service.interface';
import { AuthVM } from '@app/auth/vms/auth.vm';
import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { User } from '@app/user/domains/user.aggregate';
import { IUserService } from '@app/user/interfaces/user.service.interface';
import { USER_SERVICE } from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { LoginCommand } from './login.command';
import { LoginResult } from './login.result';

@CommandHandler(LoginCommand)
export class LoginCommandHandler extends CommandHandlerBase<
  LoginCommand,
  LoginResult
> {
  constructor(
    @InjectPinoLogger() readonly logger: PinoLogger,
    @Inject(USER_SERVICE) readonly userService: IUserService,
    @Inject(AUTH_SERVICE) readonly authService: IAuthService,
  ) {
    super(logger);
  }

  async handleCommand(command: LoginCommand): Promise<LoginResult> {
    let user: User;
    if (command.props.email) {
      user = await this.userService.getAggregateByEmail(command.props.email);
    } else if (command.props.phone) {
      user = await this.userService.getAggregateByPhone(command.props.phone);
    } else {
      throw new EmailOrPhoneRequiredException();
    }

    user.loginWithPassword(command.props.password);
    user.commit();

    const accessToken = await this.authService.generateAccessToken(
      user.props(),
    );
    const refreshToken = await this.authService.generateRefreshToken(
      user.props(),
    );

    const authVM = new AuthVM({
      accessToken,
      refreshToken,
    });
    return new LoginResult(authVM);
  }
}
