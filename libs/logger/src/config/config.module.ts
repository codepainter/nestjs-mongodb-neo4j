import * as Joi from 'joi';

import { Environment } from '@app/shared/shared.constants';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LogLevel } from '../logger.constants';
import config from './config';
import { LoggerConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...Object.values(Environment))
          .default(Environment.Development),
        LOG_LEVEL: Joi.string().valid(...Object.values(LogLevel)),
      }),
      validationOptions: {
        allowUnknown: true,
      },
      validate: async () => {
        await ConfigModule.envVariablesLoaded;
      },
    }),
  ],
  providers: [LoggerConfigService],
  exports: [LoggerConfigService],
})
export class LoggerConfigModule {}
