import { join, resolve } from 'path';

import { ApiPostgresModule } from '@app/database/api-service/api-postgres.module';
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
    ApiPostgresModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
