import { Environment } from '@app/shared/shared.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class ApiPostgresConfigService {
  private config: ConfigType<typeof config>;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get('api-postgres');
  }

  get url(): string {
    return this.config.url;
  }

  get isProduction(): boolean {
    return this.config.env === Environment.Production;
  }
}
