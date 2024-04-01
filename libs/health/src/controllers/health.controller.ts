import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { MongooseHealthIndicator } from '../indicators/mongoose.health-indicator';
import { HealthResult } from './health.result';

@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  async healthCheck() {
    const details = await this.health.check([
      () => this.mongoHealthIndicator.isHealthy('mongodb'),
    ]);

    return new HealthResult(details);
  }
}
