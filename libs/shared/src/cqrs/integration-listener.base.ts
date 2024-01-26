import { PinoLogger } from 'nestjs-pino';

import { IEventHandler } from '@nestjs/cqrs';

export abstract class IntegrationListenerBase<TEvent>
  implements IEventHandler<TEvent>
{
  constructor(readonly logger: PinoLogger) {}

  abstract handleIntegrationEvent(event: TEvent): void;

  async handle(integrationEvent: TEvent): Promise<void> {
    this.logger.info('handle()');
    this.logger.debug({ integrationEvent }, 'Integration Event');

    try {
      return await this.handleIntegrationEvent(integrationEvent);
    } catch (error) {
      this.logger.error({ error }, 'Integration Listener Error Caught');
      throw error;
    }
  }
}
