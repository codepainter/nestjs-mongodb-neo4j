import * as Joi from 'joi';

import { validate } from '@app/shared/config/validate';
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
        NODE_ENV: Joi.string().valid(...Object.values(Environment)),
        LOG_LEVEL: Joi.string().valid(...Object.values(LogLevel)),
      }),
      validationOptions: {
        allowUnknown: true,
      },
      validate,
    }),
  ],
  providers: [LoggerConfigService],
  exports: [LoggerConfigService],
})
export class LoggerConfigModule {}
