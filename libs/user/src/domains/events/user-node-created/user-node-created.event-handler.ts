import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EventHandlerBase } from '@app/shared/cqrs/event-handler.base';
import { EventsHandler } from '@nestjs/cqrs';

import { UserNodeCreatedEvent } from './user-node-created.event';

@EventsHandler(UserNodeCreatedEvent)
export class UserNodeCreatedEventHandler extends EventHandlerBase<UserNodeCreatedEvent> {
  constructor(
    @InjectPinoLogger(UserNodeCreatedEventHandler.name)
    readonly logger: PinoLogger,
  ) {
    super(logger);
  }

  async handleEvent(event: UserNodeCreatedEvent): Promise<void> {
    this.logger.trace('handleEvent()');
    this.logger.info(
      event,
      `Node (:User {id: ${event.props.id}}) has been created.`,
    );
  }
}
