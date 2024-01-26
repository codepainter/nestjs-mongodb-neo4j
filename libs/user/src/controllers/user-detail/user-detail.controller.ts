import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserDetailsRequestBodyDto } from '@app/user/dtos/user-detail.request-body.dto';
import { UserDetailsQuery } from '@app/user/queries/user-detail/user-detail.query';
import { Body, Controller, Get } from '@nestjs/common';
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
    summary: 'Get user details',
    description: 'Get user details',
  })
  @ApiOkResponse(apiOkResponseSchema)
  @ApiNotFoundResponse(notFoundResponseSchema)
  getUser(@Body() body: UserDetailsRequestBodyDto) {
    this.logger.info('getUser()');
    this.logger.debug({ body }, 'Body');

    const query = new UserDetailsQuery({ id: body.id });

    return this.queryBus.execute(query);
  }
}
