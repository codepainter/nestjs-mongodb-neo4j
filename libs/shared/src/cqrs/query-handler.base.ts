import { PinoLogger } from 'nestjs-pino';

import { IQueryHandler } from '@nestjs/cqrs';

export abstract class QueryHandlerBase<TQuery, TResult = any>
  implements IQueryHandler<TQuery, TResult>
{
  constructor(readonly logger: PinoLogger) {}

  abstract handleQuery(query: TQuery): Promise<TResult>;

  async execute(query: TQuery): Promise<TResult> {
    this.logger.info('execute()');
    this.logger.debug({ query }, 'Query');
    try {
      return await this.handleQuery(query);
    } catch (error) {
      this.logger.error({ error }, 'Query Handler Error Caught');
      throw error;
    }
  }
}
