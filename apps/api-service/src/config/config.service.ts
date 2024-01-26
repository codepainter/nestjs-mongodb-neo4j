import { Environment } from '@app/shared/shared.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppConfigService {
  private config: ConfigType<typeof config>;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get('app');
  }

  get env(): string {
    return this.config.env;
  }

  get port(): number {
    return this.config.port;
  }

  get isProduction(): boolean {
    return this.env === Environment.Production;
  }
}
