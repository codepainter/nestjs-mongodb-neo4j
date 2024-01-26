import { PinoLogger } from 'nestjs-pino';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { API_DB_CONNECTION } from '../api-postgres.constants';
import { PinoTypeormLogger } from '../loggers/pino-typeorm.logger';
import { ApiPostgresConfigModule } from './config/config.module';
import { ApiPostgresConfigService } from './config/config.service';
import { UserTypeOrmEntity } from './entities/user.typeorm-entity';

const Entities = [UserTypeOrmEntity];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: API_DB_CONNECTION,
      imports: [ApiPostgresConfigModule],
      inject: [ApiPostgresConfigService, PinoLogger],
      useFactory: (
        configService: ApiPostgresConfigService,
        logger: PinoLogger,
      ) => {
        logger.setContext(API_DB_CONNECTION);
        return {
          type: 'postgres',
          url: configService.url,
          entities: Entities,
          logging: !configService.isProduction,
          logger: !configService.isProduction
            ? new PinoTypeormLogger(logger)
            : undefined,
        };
      },
    }),
  ],
})
export class ApiPostgresModule {}
