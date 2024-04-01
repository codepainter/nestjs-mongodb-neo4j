import { Environment } from '@app/shared/shared.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class RabbitMQConfigService {
  private config: ConfigType<typeof config>;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get('rabbitmq');
  }

  get uri(): string {
    return this.config.uri;
  }

  get isProduction(): boolean {
    return this.config.env === Environment.Production;
  }
}
