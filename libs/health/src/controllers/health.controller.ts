import { Controller, Get } from '@nestjs/common';

import { HealthResult } from './health.result';

@Controller()
export class HealthController {
  @Get('health')
  healthCheck() {
    return new HealthResult({
      status: 'ok',
      details: {
        uptime: process.uptime(),
        message: 'OK',
      },
    });
  }
}
