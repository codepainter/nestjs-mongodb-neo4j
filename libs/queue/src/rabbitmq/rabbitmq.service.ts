import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

export type PublishProps<T> = {
  exchange: string;
  routingKey: string;
  message: T;
};

@Injectable()
export class RabbitMQService {
  constructor(
    @InjectPinoLogger(RabbitMQService.name)
    readonly logger: PinoLogger,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  publish<T>(props: PublishProps<T>) {
    this.logger.trace('publish()');
    this.logger.debug({ props }, 'props');
    this.amqpConnection.publish<T>(
      props.exchange,
      props.routingKey,
      props.message,
    );
  }
}
