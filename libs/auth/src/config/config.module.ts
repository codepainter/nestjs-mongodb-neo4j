import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { AuthConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES_IN: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
