import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';

import { ExpressRequest } from '@app/logger/interfaces/logger.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenType } from '../auth.constants';
import { AuthRequest } from '../auth.types';
import { REFRESH_TOKEN_REQUIRED } from '../decorators/refresh-token-required.decorator';

@Injectable()
export class RefreshTokenRequiredGuard implements CanActivate {
  constructor(
    @InjectPinoLogger(RefreshTokenRequiredGuard.name)
    readonly logger: PinoLogger,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.trace('RefreshTokenRequiredGuard.canActivate()');
    const refreshTokenRequired = this.reflector.get<boolean>(
      REFRESH_TOKEN_REQUIRED,
      context.getHandler(),
    );
    if (refreshTokenRequired === undefined) {
      return true;
    }
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    const auth = request.user as AuthRequest;
    this.logger.debug({ auth }, 'Auth');
    if (auth.type === TokenType.REFRESH_TOKEN) return true;

    return false;
  }
}
