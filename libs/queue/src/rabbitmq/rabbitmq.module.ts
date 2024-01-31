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
import { RABBITMQ_SERVICE } from './rabbitmq.constants';
import { RabbitMQService } from './rabbitmq.service';

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
    routingKey: 'neo4j.user.persisted',
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
        connectionInitOptions: { wait: false },
      }),
    }),
    RabbitMQModule,
  ],
  providers: [
    {
      provide: RABBITMQ_SERVICE,
      useClass: RabbitMQService,
    },
  ],
  exports: [RabbitMQModuleNestjs, RABBITMQ_SERVICE],
})
export class RabbitMQModule {}
