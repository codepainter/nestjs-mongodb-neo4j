import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';

import { ExpressRequest } from '@app/logger/interfaces/logger.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenType } from '../auth.constants';
import { AuthRequest } from '../auth.types';
import { ACCESS_TOKEN_REQUIRED } from '../decorators/access-token-required.decorator';

@Injectable()
export class AccessTokenRequiredGuard implements CanActivate {
  constructor(
    @InjectPinoLogger(AccessTokenRequiredGuard.name)
    readonly logger: PinoLogger,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.trace('AccessTokenRequiredGuard.canActivate()');
    const accessTokenRequired = this.reflector.get<boolean>(
      ACCESS_TOKEN_REQUIRED,
      context.getHandler(),
    );
    if (accessTokenRequired === undefined) {
      return true;
    }
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    const auth = request.user as AuthRequest;
    this.logger.debug({ auth }, 'AuthRequest');
    if (auth.type === TokenType.ACCESS_TOKEN) return true;

    return false;
  }
}
