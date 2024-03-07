import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { IUserMongoWriteRepository } from '@app/user/interfaces/user.mongo-write-repository.interface';
import { USER_WRITE_REPOSITORY } from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { EventBus, EventsHandler } from '@nestjs/cqrs';

import { UserPersistedEvent } from '../user-persisted/user-persisted.event';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler extends EventHandlerBase<UserCreatedEvent> {
  constructor(
    @InjectPinoLogger(UserCreatedEventHandler.name)
    readonly logger: PinoLogger,
    @Inject(USER_WRITE_REPOSITORY)
    readonly userWriteRepo: IUserMongoWriteRepository,
    private eventBus: EventBus,
  ) {
    super(logger);
  }

  async handleEvent(event: UserCreatedEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    this.logger.info(
      event,
      `User with email: ${event.props.email} (${event.props.id}) has been created.`,
    );

    // Persist to MongoDB
    await this.userWriteRepo.create({
      id: event.props.id,
      name: event.props.name,
      email: event.props.email,
      password: event.props.password,
      createdAt: event.props.createdAt,
      updatedAt: event.props.updatedAt,
    });

    return this.eventBus.publish(new UserPersistedEvent(event.props));
  }
}
