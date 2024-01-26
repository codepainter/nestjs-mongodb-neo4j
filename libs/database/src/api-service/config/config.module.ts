import * as Joi from 'joi';

import { validate } from '@app/shared/config/validate';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { ApiPostgresConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        PG_DATABASE_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      validate,
    }),
  ],
  providers: [ApiPostgresConfigService],
  exports: [ApiPostgresConfigService],
})
export class ApiPostgresConfigModule {}
