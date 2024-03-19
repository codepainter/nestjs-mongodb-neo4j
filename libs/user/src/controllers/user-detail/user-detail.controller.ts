import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Auth } from '@app/auth/decorators/auth.decorator';
import { JwtAuthGuard } from '@app/auth/guards/jwt.auth-guard';
import { UserDetailsQuery } from '@app/user/queries/user-detail/user-detail.query';
import { UserVM } from '@app/user/vms/user.vm';
import { Controller, Get, UseGuards } from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  getUser(@Auth() auth: UserVM) {
    this.logger.trace('getUser()');
    this.logger.debug({ auth }, 'Auth');

    const query = new UserDetailsQuery({ id: auth.id });

    return this.queryBus.execute(query);
  }
}
