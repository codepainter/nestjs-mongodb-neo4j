import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AuthConfigService {
  private config: ConfigType<typeof config>;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getOrThrow('auth');
  }

  get secret(): string {
    return this.config.secret;
  }

  get expiresIn(): string {
    return this.config.expiresIn;
  }
}
