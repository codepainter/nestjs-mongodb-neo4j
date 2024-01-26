import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { QueryHandlerBase } from '@app/shared/cqrs/query-handler.base';
import { UserNotFoundException } from '@app/user/errors/user.errors';
import { IUserReadRepository } from '@app/user/interfaces/user.read-repository.interface';
import { USER_READ_REPOSITORY } from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { UserDetailsQuery } from './user-detail.query';
import { UserDetailsResult } from './user-detail.result';

@QueryHandler(UserDetailsQuery)
export class UserDetailsQueryHandler extends QueryHandlerBase<
  UserDetailsQuery,
  UserDetailsResult
> {
  constructor(
    @InjectPinoLogger(UserDetailsQueryHandler.name) readonly logger: PinoLogger,
    @Inject(USER_READ_REPOSITORY)
    private readonly userReadRepo: IUserReadRepository,
  ) {
    super(logger);
  }

  async handleQuery(query: UserDetailsQuery): Promise<UserDetailsResult> {
    this.logger.info('handleQuery()');
    this.logger.debug({ query }, 'Query');

    const userVm = await this.userReadRepo.findById(query.props.id);
    if (!userVm) {
      throw new UserNotFoundException({ id: query.props.id });
    }

    return new UserDetailsResult(userVm);
  }
}
