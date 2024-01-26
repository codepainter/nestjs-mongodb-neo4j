import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { IUserWriteRepository } from '@app/user/interfaces/user.write-repository.interface';
import { USER_WRITE_REPOSITORY } from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';

import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler extends EventHandlerBase<UserCreatedEvent> {
  constructor(
    @InjectPinoLogger(UserCreatedEventHandler.name) readonly logger: PinoLogger,
    @Inject(USER_WRITE_REPOSITORY) readonly userWriteRepo: IUserWriteRepository,
  ) {
    super(logger);
  }

  async handleEvent(event: UserCreatedEvent): Promise<void> {
    await this.userWriteRepo.create(event.props);
  }
}
