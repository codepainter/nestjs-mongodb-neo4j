import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { RabbitMQConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [RabbitMQConfigService],
  exports: [RabbitMQConfigService],
})
export class RabbitMQConfigModule {}
