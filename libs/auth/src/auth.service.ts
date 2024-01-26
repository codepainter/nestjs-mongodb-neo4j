import * as ms from 'ms';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserProps } from '@app/user/domains/user.aggregate';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenType } from './auth.constants';
import { AuthConfigService } from './config/config.service';
import { IAuthService } from './interfaces/auth.service.interface';
import { REDIS_CACHE_SERVICE } from '@app/cache/cache.constants';
import { ICacheService } from '@app/cache/cache.interface';

export class AuthService implements IAuthService {
  private ACCESS_TOKEN_EXPIRES_IN = '60s';

  constructor(
    @InjectPinoLogger(AuthService.name) private readonly logger: PinoLogger,
    private readonly jwtService: JwtService,
    @Inject(AuthConfigService) private readonly config: AuthConfigService,
    @Inject(REDIS_CACHE_SERVICE) private readonly cacheService: ICacheService,
  ) {}

  async generateAccessToken(userProps: Pick<UserProps, 'id'>): Promise<string> {
    this.logger.debug({ userProps }, 'generateAccessToken()');

    const payload = {
      type: TokenType.ACCESS_TOKEN,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      subject: userProps.id,
    });
    await this.cacheToken(accessToken, ms(this.ACCESS_TOKEN_EXPIRES_IN) / 1000);

    return accessToken;
  }

  async generateRefreshToken(
    userProps: Pick<UserProps, 'id'>,
  ): Promise<string> {
    this.logger.debug({ userProps }, 'generateRefreshToken()');

    const payload = {
      type: TokenType.REFRESH_TOKEN,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.expiresIn,
      subject: userProps.id,
    });
    await this.cacheToken(refreshToken, ms(this.config.expiresIn) / 1000);

    return refreshToken;
  }

  async cacheToken(token: string, ttl: number): Promise<void> {
    this.logger.debug({ token }, 'cacheToken()');
    await this.cacheService.set(token, '1', ttl);
  }

  async isTokenCached(token: string): Promise<boolean> {
    this.logger.debug({ token }, 'isTokenCached()');
    const cachedToken = await this.cacheService.get(token);
    return !!cachedToken;
  }

  async invalidateToken(token: string): Promise<void> {
    this.logger.debug({ token }, 'invalidateToken()');
    await this.cacheService.del(token);
  }
}
