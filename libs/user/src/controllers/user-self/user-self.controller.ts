import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AuthRequest } from '@app/auth';
import { AccessTokenRequired } from '@app/auth/decorators/access-token-required.decorator';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { AccessTokenRequiredGuard } from '@app/auth/guards/access-token-required.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserDetailsQuery } from '@app/user/queries/user-detail/user-detail.query';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class UserSelfController {
  constructor(
    @InjectPinoLogger(UserSelfController.name) readonly logger: PinoLogger,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('user.self')
  @ApiTags('user')
  @ApiOperation({
    operationId: 'user.self',
    summary: 'Get self details',
    description: 'Get self details',
  })
  @AccessTokenRequired()
  @UseGuards(JwtAuthGuard, AccessTokenRequiredGuard)
  userSelf(@Auth() auth: AuthRequest) {
    this.logger.trace('userSelf()');
    this.logger.debug({}, 'QueryString');

    const query = new UserDetailsQuery({ id: auth.id });

    return this.queryBus.execute(query);
  }
}
