import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AccessTokenRequired } from '@app/auth/decorators/access-token-required.decorator';
import { AccessTokenRequiredGuard } from '@app/auth/guards/access-token-required.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserDetailsRequestBodyDto } from '@app/user/dtos/user-detail.request-body.dto';
import { UserDetailsQuery } from '@app/user/queries/user-detail/user-detail.query';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { notFoundResponseSchema } from './not-found.response-schema';
import { apiOkResponseSchema } from './ok.response-schema';

@Controller()
export class UserDetailsController {
  constructor(
    @InjectPinoLogger(UserDetailsController.name) readonly logger: PinoLogger,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('user.detail')
  @ApiTags('user')
  @ApiOperation({
    operationId: 'user.detail',
    summary: 'Get user details',
    description: 'Get user details',
  })
  @ApiOkResponse(apiOkResponseSchema)
  @ApiNotFoundResponse(notFoundResponseSchema)
  @AccessTokenRequired()
  @UseGuards(JwtAuthGuard, AccessTokenRequiredGuard)
  getUser(@Query() qs: UserDetailsRequestBodyDto) {
    this.logger.trace('getUser()');
    this.logger.debug({ qs }, 'QueryString');

    const query = new UserDetailsQuery({ id: qs.id });

    return this.queryBus.execute(query);
  }
}
