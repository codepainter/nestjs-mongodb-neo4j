import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthErrorCodes } from '../auth.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectPinoLogger(JwtAuthGuard.name) private readonly logger: PinoLogger,
  ) {
    super();
  }

  handleRequest(err, user, info) {
    this.logger.trace('JwtAuthGuard.handleRequest()');
    this.logger.debug({ err, user, info }, 'Error, User, Info');
    if (err || !user) {
      throw new UnauthorizedException({
        code: AuthErrorCodes.JWT_ERROR,
        message: 'JWT Error',
        metadata: info,
      });
    }
    return user;
  }
}
