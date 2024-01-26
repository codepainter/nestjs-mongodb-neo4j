import { PinoLogger } from 'nestjs-pino';

import { ICommandHandler } from '@nestjs/cqrs';

export abstract class CommandHandlerBase<TCommand, TResult = any>
  implements ICommandHandler<TCommand, TResult>
{
  constructor(readonly logger: PinoLogger) {}

  abstract handleCommand(command: TCommand): Promise<TResult>;

  async execute(command: TCommand): Promise<TResult> {
    this.logger.trace('START');
    this.logger.debug({ command }, 'Execute Command');
    try {
      const result = await this.handleCommand(command);
      this.logger.trace('END');
      return result;
    } catch (error) {
      this.logger.error({ error }, 'Command Handler Error Caught');
      throw error;
    }
  }
}
