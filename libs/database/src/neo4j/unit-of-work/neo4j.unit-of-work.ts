import { PinoLogger } from 'nestjs-pino';

import { IUnitOfWork } from '@app/shared/unit-or-work/unit-of-work.interface';
import { Neo4jService, Session, Transaction } from '@nhogs/nestjs-neo4j';

export class Neo4jUnitOfWork implements IUnitOfWork {
  private session: Session;
  private tx: Transaction;

  constructor(
    private readonly name: string,
    private readonly logger: PinoLogger,
    private readonly neo4jService: Neo4jService,
  ) {
    this.name = name;
    this.logger.setContext(`${this.name}`);
  }

  async start(): Promise<void> {
    this.logger.trace('Start Neo4j Session');
    this.session = this.neo4jService.getSession({ write: true });

    this.logger.trace('Start Neo4j Tx');
    this.tx = this.session.beginTransaction();
  }

  async complete(work: () => void): Promise<void> {
    this.logger.trace('Completing Work');
    try {
      await work();
      await this.tx.commit();
      this.logger.trace('Work Completed');
    } catch (error) {
      await this.tx.rollback();
      this.logger.error('Work Aborted. Rollback.');
      throw error;
    } finally {
      await this.tx.close();
      this.logger.trace('Tx Closed');
    }
  }
}
