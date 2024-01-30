import {
  RabbitMQChannels,
  RabbitMQConfig,
  RabbitMQExchangeConfig,
  RabbitMQModule as RabbitMQModuleNestjs,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';

import { RabbitMQConfigModule } from './config/config.module';
import { RabbitMQConfigService } from './config/config.service';

const Exchanges: RabbitMQExchangeConfig[] = [
  {
    name: 'neo4j-exchange',
    type: 'topic',
  },
];

const Channels: RabbitMQChannels = {
  'default-channel': {
    prefetchCount: 15,
    default: true,
  },
  'neo4j-channel': {
    prefetchCount: 15,
  },
};

const Queues: RabbitMQQueueConfig[] = [
  {
    name: 'neo4j-queue',
    options: {
      durable: true,
    },
  },
];

@Global()
@Module({
  imports: [
    RabbitMQModuleNestjs.forRootAsync(RabbitMQModuleNestjs, {
      imports: [RabbitMQConfigModule],
      inject: [RabbitMQConfigService],
      useFactory: (config: RabbitMQConfigService): RabbitMQConfig => ({
        uri: config.uri,
        exchanges: Exchanges,
        channels: Channels,
        queues: Queues,
      }),
    }),
    RabbitMQModule,
  ],
  providers: [],
  exports: [],
})
export class RabbitMQModule {}
