import { PinoLogger } from 'nestjs-pino';

import { IQueryHandler } from '@nestjs/cqrs';

export abstract class QueryHandlerBase<TQuery, TResult = any>
  implements IQueryHandler<TQuery, TResult>
{
  constructor(readonly logger: PinoLogger) {}

  abstract handleQuery(query: TQuery): Promise<TResult>;

  async execute(query: TQuery): Promise<TResult> {
    this.logger.trace('START');
    this.logger.debug({ query }, 'Execute Query');
    try {
      const result = await this.handleQuery(query);
      this.logger.trace('END');
      return result;
    } catch (error) {
      this.logger.error({ error }, 'Query Handler Error Caught');
      throw error;
    }
  }
}
