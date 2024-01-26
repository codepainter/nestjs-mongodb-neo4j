import * as Joi from 'joi';

import { Environment } from '@app/shared/shared.constants';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(...Object.values(Environment)),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
