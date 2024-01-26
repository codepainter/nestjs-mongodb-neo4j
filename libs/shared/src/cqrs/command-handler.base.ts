import { PinoLogger } from 'nestjs-pino';

import { ICommandHandler } from '@nestjs/cqrs';

export abstract class CommandHandlerBase<TCommand, TResult = any>
  implements ICommandHandler<TCommand, TResult>
{
  constructor(readonly logger: PinoLogger) {}

  abstract handleCommand(command: TCommand): Promise<TResult>;

  async execute(command: TCommand): Promise<TResult> {
    this.logger.info('execute()');
    this.logger.debug({ command }, 'Command');
    try {
      return await this.handleCommand(command);
    } catch (error) {
      this.logger.error({ error }, 'Command Handler Error Caught');
      throw error;
    }
  }
}
