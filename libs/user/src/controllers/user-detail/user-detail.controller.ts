import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserDetailsRequestBodyDto } from '@app/user/dtos/user-detail.request-body.dto';
import { UserDetailsQuery } from '@app/user/queries/user-detail/user-detail.query';
import { Controller, Get, Query } from '@nestjs/common';
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
  getUser(@Query() qs: UserDetailsRequestBodyDto) {
    this.logger.trace('getUser()');
    this.logger.debug({ qs }, 'QueryString');

    const query = new UserDetailsQuery({ id: qs.id });

    return this.queryBus.execute(query);
  }
}
