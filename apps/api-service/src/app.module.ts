import { join, resolve } from 'path';

import { MongoDBModule } from '@app/database/mongodb';
import { Neo4jModule } from '@app/database/neo4j';
import { HealthModule } from '@app/health';
import { LoggerModule } from '@app/logger';
import { RabbitMQModule } from '@app/queue/rabbitmq';
import { Environment } from '@app/shared';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV !== Environment.Production
          ? resolve(join(process.cwd(), 'apps/api-service', '.env'))
          : undefined,
    }),
    AppConfigModule,
    LoggerModule.init({
      exclude: ['health'],
    }),
    MongoDBModule,
    Neo4jModule,
    RabbitMQModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
