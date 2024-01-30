import { Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserCommandHandler } from './commands/create-user/create-user.command-handler';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { UserDetailsController } from './controllers/user-detail/user-detail.controller';
import { UserCreatedEventHandler } from './domains/events/user-created/user-created.event-handler';
import { UserNodeCreatedEventHandler } from './domains/events/user-node-created/user-node-created.event-handler';
import { UserPersistedEventHandler } from './domains/events/user-persisted/user-persisted.event-handler';
import { UserAggregateFactory } from './domains/user.factory';
import { UserErrorInterceptor } from './interceptors/user.error-interceptor';
import { UserDetailsQueryHandler } from './queries/user-detail/user-detail.query-handler';
import { UserMongooseReadRepository } from './repositories/user.mongoose.read-repository';
import { UserMongooseWriteRepository } from './repositories/user.mongoose.write-repository';
import { UserNeo4jWriteRepository } from './repositories/user.neo4j.write-repository';
import {
  USER_AGGREGATE_FACTORY,
  USER_NEO4J_WRITE_REPOSITORY,
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

const EventHandlers: Provider[] = [
  UserCreatedEventHandler,
  UserPersistedEventHandler,
  UserNodeCreatedEventHandler,
];

const CommandHandlers: Provider[] = [CreateUserCommandHandler];

const QueryHandlers: Provider[] = [UserDetailsQueryHandler];

const Repositories: Provider[] = [
  {
    provide: USER_WRITE_REPOSITORY,
    useClass: UserMongooseWriteRepository,
  },
  {
    provide: USER_READ_REPOSITORY,
    useClass: UserMongooseReadRepository,
  },
  {
    provide: USER_NEO4J_WRITE_REPOSITORY,
    useClass: UserNeo4jWriteRepository,
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
  controllers: [CreateUserController, UserDetailsController],
  exports: [USER_SERVICE],
})
export class UserModule {}
