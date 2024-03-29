import { Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserCommandHandler } from './commands/create-user/create-user.command-handler';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { UserDetailsController } from './controllers/user-detail/user-detail.controller';
import { UserSelfController } from './controllers/user-self/user-self.controller';
import { UserLoggedInEventHandler } from './domains/events/user-logged-in/user-logged-in.event-handler';
import { UserAggregateFactory } from './domains/user.factory';
import { UserErrorInterceptor } from './interceptors/user.error-interceptor';
import { UserDetailsQueryHandler } from './queries/user-detail/user-detail.query-handler';
import { UserReadRepository } from './repositories/user.read-repository';
import { UserWriteRepository } from './repositories/user.write-repository';
import {
  USER_AGGREGATE_FACTORY,
  USER_READ_REPOSITORY,
  USER_SERVICE,
  USER_WRITE_REPOSITORY,
} from './user.constants';
import { UserService } from './user.service';

const Domains: Provider[] = [
  {
    provide: USER_AGGREGATE_FACTORY,
    useClass: UserAggregateFactory,
  },
];

const EventHandlers: Provider[] = [UserLoggedInEventHandler];

const CommandHandlers: Provider[] = [CreateUserCommandHandler];

const QueryHandlers: Provider[] = [UserDetailsQueryHandler];

const Repositories: Provider[] = [
  {
    provide: USER_WRITE_REPOSITORY,
    useClass: UserWriteRepository,
  },
  {
    provide: USER_READ_REPOSITORY,
    useClass: UserReadRepository,
  },
];

const Interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: UserErrorInterceptor,
  },
];

const Services: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  imports: [CqrsModule],
  providers: [
    ...Domains,
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Repositories,
    ...Interceptors,
    ...Services,
  ],
  controllers: [
    CreateUserController,
    UserDetailsController,
    UserSelfController,
  ],
  exports: [USER_SERVICE],
})
export class UserModule {}
