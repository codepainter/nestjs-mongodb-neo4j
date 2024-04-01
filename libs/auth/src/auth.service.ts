import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { PasswordUtil } from '@app/shared/utils/password.util';
import { USER_SERVICE } from '@app/user';
import { IUserService } from '@app/user/interfaces/user.service.interface';
import { UserVM } from '@app/user/vms/user.vm';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenType } from './auth.constants';
import { AuthConfigService } from './config/config.service';
import { AuthVM } from './vms/access-token.vm';

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name) readonly logger: PinoLogger,
    @Inject(USER_SERVICE) readonly userService: IUserService,
    private jwtService: JwtService,
    @Inject(AuthConfigService)
    private readonly configService: AuthConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserVM> {
    this.logger.trace('validateUser()');
    let user = null;

    try {
      user = await this.userService.getUserVMByEmail(email);
    } catch (error) {
      throw new UnauthorizedException();
    }

    if (!PasswordUtil.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: UserVM): Promise<AuthVM> {
    this.logger.trace('login()');

    const accessToken = this.jwtService.sign(
      {
        email: user.email,
        type: TokenType.ACCESS_TOKEN,
      },
      {
        subject: user.id,
        expiresIn: this.configService.expiresIn,
        issuer: this.configService.issuer,
        audience: this.configService.audience,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        type: TokenType.REFRESH_TOKEN,
      },
      {
        subject: user.id,
        expiresIn: '30d',
        issuer: this.configService.issuer,
        audience: this.configService.audience,
      },
    );

    return new AuthVM({
      accessToken,
      refreshToken,
    });
  }
}
