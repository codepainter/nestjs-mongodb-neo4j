import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { QueryHandlerBase } from '@app/shared/cqrs/query-handler.base';
import { IUserMongoReadRepository } from '@app/user/interfaces/user.mongo-read-repository.interface';
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
    private readonly userReadRepo: IUserMongoReadRepository,
  ) {
    super(logger);
  }

  async handleQuery(query: UserDetailsQuery): Promise<UserDetailsResult> {
    this.logger.trace('handleQuery()');
    this.logger.debug({ query }, 'Query');

    const userVm = await this.userReadRepo.findById(query.props.id);

    return new UserDetailsResult(userVm);
  }
}
