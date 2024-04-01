import { Connection } from 'mongoose';

import { MONGODB_CONNECTION } from '@app/database/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class MongooseHealthIndicator extends HealthIndicator {
  constructor(
    @InjectConnection(MONGODB_CONNECTION)
    private readonly connection: Connection,
  ) {
    super();
  }

  async isHealthy(key: string) {
    const readyState = this.connection.readyState;
    return this.getStatus(key, readyState == 1);
  }
}
