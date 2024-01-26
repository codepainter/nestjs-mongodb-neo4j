import { PinoLogger } from 'nestjs-pino';

import { IEventHandler } from '@nestjs/cqrs';

export abstract class IntegrationListenerBase<TEvent>
  implements IEventHandler<TEvent>
{
  constructor(readonly logger: PinoLogger) {}

  abstract handleIntegrationEvent(event: TEvent): void;

  async handle(integrationEvent: TEvent): Promise<void> {
    this.logger.trace('BEGIN');
    this.logger.debug({ integrationEvent }, 'Integration Event');
    try {
      const result = await this.handleIntegrationEvent(integrationEvent);
      this.logger.trace('END');
      return result;
    } catch (error) {
      this.logger.error({ error }, 'Integration Listener Error Caught');
      throw error;
    }
  }
}
