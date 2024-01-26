import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { EventsHandler } from '@nestjs/cqrs';

import { UserLoggedOutEvent } from './user-logged-out.event';

@EventsHandler(UserLoggedOutEvent)
export class UserLoggedOutEventHandler extends EventHandlerBase<UserLoggedOutEvent> {
  constructor(
    @InjectPinoLogger(UserLoggedOutEventHandler.name)
    readonly logger: PinoLogger,
  ) {
    super(logger);
  }

  handleEvent(event: UserLoggedOutEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    // some business logic here
    this.logger.info(
      `User with email: ${event.props.email} (${event.props.id}) has Logged-Out.`,
    );
    return;
  }
}
