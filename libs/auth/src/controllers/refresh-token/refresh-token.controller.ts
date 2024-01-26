import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { TokenType } from '@app/auth/auth.constants';
import { AuthRequest } from '@app/auth/auth.types';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { BearerToken } from '@app/auth/decorators/bearer-token.decorator';
import { RefreshTokenRequired } from '@app/auth/decorators/refresh-token-required.decorator';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { RefreshTokenRequiredGuard } from '@app/auth/guards/refresh-token-required.guard';
import { RefreshTokenQuery } from '@app/auth/queries/refresh-token/refresh-token.query';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class RefreshTokenController {
  constructor(
    @InjectPinoLogger(RefreshTokenController.name)
    private readonly logger: PinoLogger,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('auth.refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiTags('auth')
  @ApiOperation({
    operationId: 'auth.refresh-token',
    summary: 'Refresh token',
    description: 'Refresh token',
  })
  @ApiOkResponse()
  @ApiBearerAuth(TokenType.REFRESH_TOKEN)
  @RefreshTokenRequired()
  @UseGuards(JwtAuthGuard, RefreshTokenRequiredGuard)
  refreshToken(@BearerToken() token: string, @Auth() auth: AuthRequest) {
    this.logger.trace('RefreshTokenController.refreshToken()');
    this.logger.debug({ token, auth }, 'Token and Auth');

    const query = new RefreshTokenQuery({
      id: auth.id,
      refreshToken: token,
    });

    return this.queryBus.execute(query);
  }
}
