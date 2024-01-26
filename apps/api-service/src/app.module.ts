import { join, resolve } from 'path';

import { MongoDBModule } from '@app/database/mongodb/mongodb.module';
import { Neo4jModule } from '@app/database/neo4j/neo4j.module';
import { HealthModule } from '@app/health';
import { LoggerModule } from '@app/logger';
import { Environment } from '@app/shared/shared.constants';
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
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
