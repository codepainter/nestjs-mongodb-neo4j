import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { EventsHandler } from '@nestjs/cqrs';

import { UserLoggedInEvent } from './user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInEventHandler extends EventHandlerBase<UserLoggedInEvent> {
  constructor(
    @InjectPinoLogger(UserLoggedInEventHandler.name)
    readonly logger: PinoLogger,
  ) {
    super(logger);
  }

  handleEvent(event: UserLoggedInEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    this.logger.info(
      event,
      `User with email: ${event.props.email} (${event.props.id}) has Logged-In.`,
    );
    // some business logic here
    // for integration events, you can publish other events here
    // or call other services here
    return;
  }
}
