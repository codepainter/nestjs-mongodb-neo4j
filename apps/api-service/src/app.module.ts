import { join, resolve } from 'path';

import { AuthModule } from '@app/auth';
import { MongoDBModule } from '@app/database/mongodb';
import { Neo4jModule } from '@app/database/neo4j';
import { FollowModule } from '@app/follow';
import { HealthModule } from '@app/health';
import { LoggerModule } from '@app/logger';
import { RabbitMQModule } from '@app/queue/rabbitmq';
import { Environment } from '@app/shared';
import { UserModule } from '@app/user';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppConfigModule } from './config/config.module';
import { MovieModule } from '@app/movie';
import { TaskScheduleModule } from '@app/schedule';

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
    FollowModule,
    AuthModule,
    MovieModule,
    TaskScheduleModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
