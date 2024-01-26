import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AUTH_SERVICE } from '@app/auth/auth.constants';
import { IAuthService } from '@app/auth/interfaces/auth.service.interface';
import { AuthVM } from '@app/auth/vms/auth.vm';
import { QueryHandlerBase } from '@app/shared/cqrs/query-handler.base';
import { IUserService } from '@app/user/interfaces/user.service.interface';
import { USER_SERVICE } from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { RefreshTokenQuery } from './refresh-token.query';
import { RefreshTokenQueryResult } from './refresh-token.result';

@QueryHandler(RefreshTokenQuery)
export class RefreshTokenQueryHandler extends QueryHandlerBase<
  RefreshTokenQuery,
  RefreshTokenQueryResult
> {
  constructor(
    @InjectPinoLogger(RefreshTokenQueryHandler.name)
    readonly logger: PinoLogger,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {
    super(logger);
  }

  async handleQuery(
    query: RefreshTokenQuery,
  ): Promise<RefreshTokenQueryResult> {
    this.logger.trace('RefreshTokenQueryHandler.handleQuery()');
    this.logger.debug({ query }, 'Query');

    const user = await this.userService.getUserById(query.props.id);

    const accessToken = await this.authService.generateAccessToken({
      id: user.id,
    });

    await this.authService.invalidateToken(query.props.refreshToken);
    const refreshToken = await this.authService.generateRefreshToken({
      id: user.id,
    });

    const authVM = new AuthVM({
      accessToken,
      refreshToken,
    });

    return new RefreshTokenQueryResult(authVM);
  }
}
