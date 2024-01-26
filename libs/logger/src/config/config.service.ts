import { Environment } from '@app/shared/shared.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class LoggerConfigService {
  private config: ConfigType<typeof config>;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get('logger');
  }

  get env(): string {
    return this.config.env;
  }

  get level(): string {
    return this.config.level;
  }

  get isTest(): boolean {
    return this.config.env === Environment.Test;
  }

  get isProduction(): boolean {
    return this.config.env === Environment.Production;
  }

  get isLocal(): boolean {
    return this.config.env === Environment.Local;
  }
}
