import { UserModule } from '@app/user';
import { Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

import { FollowRandomCommandHandler } from './commands/follow-random/follow-random.command-handler';
import { FollowRandomController } from './controllers/follow-random/follow-random.controller';
import { FollowAggregateFactory } from './domains/follow.factory';
import {
  FOLLOW_AGGREGATE_FACTORY,
  FOLLOW_SERVICE,
  FOLLOW_WRITE_REPOSITORY,
} from './follow.constants';
import { FollowService } from './follow.service';
import { FollowErrorInterceptor } from './interceptors/follow.exception-interceptor';
import { FollowMongoWriteRepository } from './repositories/follow.mongo-write-repository';

const Controllers = [FollowRandomController];

const CommandHandlers: Provider[] = [FollowRandomCommandHandler];

const Factories: Provider[] = [
  {
    provide: FOLLOW_AGGREGATE_FACTORY,
    useClass: FollowAggregateFactory,
  },
];

const Repositories: Provider[] = [
  {
    provide: FOLLOW_WRITE_REPOSITORY,
    useClass: FollowMongoWriteRepository,
  },
];

const Services: Provider[] = [
  {
    provide: FOLLOW_SERVICE,
    useClass: FollowService,
  },
];

const Interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: FollowErrorInterceptor,
  },
];

@Module({
  imports: [CqrsModule, UserModule],
  controllers: Controllers,
  providers: [
    ...CommandHandlers,
    ...Factories,
    ...Repositories,
    ...Services,
    ...Interceptors,
  ],
  exports: [FOLLOW_SERVICE],
})
export class FollowModule {}
