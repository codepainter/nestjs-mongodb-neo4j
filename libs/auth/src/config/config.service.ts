import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AuthConfigService {
  private config: ConfigType<typeof config>;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get('auth');
  }

  get secret(): string {
    return this.config.secret;
  }

  get expiresIn(): string {
    return this.config.expiresIn;
  }

  get issuer(): string {
    return this.config.issuer;
  }

  get audience(): string {
    return this.config.audience;
  }
}
