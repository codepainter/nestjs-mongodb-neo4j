import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { MongoDBConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        MONGO_DATABASE_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [MongoDBConfigService],
  exports: [MongoDBConfigService],
})
export class MongoDBConfigModule {}
