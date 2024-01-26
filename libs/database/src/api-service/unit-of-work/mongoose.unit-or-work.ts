import { ClientSession, Connection } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';

import { IUnitOfWork } from '@app/shared/unit-or-work/unit-of-work.interface';

export class MongooseUnitOfWork implements IUnitOfWork {
  private session: ClientSession;

  constructor(
    private readonly name: string,
    private readonly logger: PinoLogger,
    private connection: Connection,
  ) {
    this.name = name;
    this.logger.setContext(`${this.name}`);
  }

  async start(): Promise<void> {
    this.logger.trace('Start Mongoose Session');
    this.session = await this.connection.startSession();

    this.logger.trace('Start Transaction');
    await this.session.startTransaction();
  }

  async complete(work: () => void): Promise<void> {
    this.logger.trace('Completing Work');
    try {
      await work();
      await this.session.commitTransaction();
      this.logger.trace('Work Completed');
    } catch (error) {
      await this.session.abortTransaction();
      this.logger.error('Work Aborted');
      throw error;
    } finally {
      await this.session.endSession();
      this.logger.trace('End Mongoose Session');
    }
  }
}
