import { API_DB_CONNECTION } from '@app/database/api-postgres.constants';
import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { TypeOrmHealthIndicator } from '../health-indicators/typeorm.health-indicator';
import { TYPEORM_HEALTH_INDICATOR } from '../health.constants';
import { HealthResult } from './health.result';

@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @Inject(TYPEORM_HEALTH_INDICATOR)
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  async check() {
    const result = await this.health.check([
      async () =>
        await this.typeOrmHealthIndicator.pingCheck(API_DB_CONNECTION),
    ]);
    return new HealthResult(result);
  }
}
