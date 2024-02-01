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
import {
  Exchange,
  Queue,
  RABBITMQ_SERVICE,
  RoutingKey,
} from './rabbitmq.constants';
import { RabbitMQService } from './rabbitmq.service';

const Exchanges: RabbitMQExchangeConfig[] = [
  {
    name: Exchange.NEO4J_EXCHANGE,
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
    name: Queue.NEO4J_QUEUE,
    exchange: Exchange.NEO4J_EXCHANGE,
    createQueueIfNotExists: true,
    options: {
      durable: true,
    },
    routingKey: [RoutingKey.NEO4J_USER_PERSISTED],
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
