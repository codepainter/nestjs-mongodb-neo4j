import { DataSource, EntityManager } from 'typeorm';

import { API_DB_CONNECTION } from '@app/database/api-postgres.constants';
import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmHealthIndicator extends HealthIndicator {
  private manager: EntityManager;

  constructor(
    @InjectDataSource(API_DB_CONNECTION)
    private readonly dataSource: DataSource,
  ) {
    super();
    this.manager = this.dataSource.createEntityManager();
  }

  async pingCheck(databaseName: string): Promise<HealthIndicatorResult> {
    try {
      await this.manager.query('SELECT 1');
      return this.getStatus(databaseName, true);
    } catch (error) {
      return this.getStatus(databaseName, false, { error });
    }
  }
}
