import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { TokenType } from '../auth.constants';
import { AuthRequest, JwtPayload } from '../auth.types';
import { AuthConfigService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectPinoLogger(JwtStrategy.name) private readonly logger: PinoLogger,
    readonly configSvc: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configSvc.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthRequest> {
    this.logger.trace('JwtStrategy.validate()');
    this.logger.debug({ payload }, 'Payload');
    return {
      id: payload.sub,
      type: payload.type as TokenType,
    };
  }
}
