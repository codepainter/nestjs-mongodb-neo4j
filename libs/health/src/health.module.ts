import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controllers/health.controller';
import { TypeOrmHealthIndicator } from './health-indicators/typeorm.health-indicator';
import { TYPEORM_HEALTH_INDICATOR } from './health.constants';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [
    {
      provide: TYPEORM_HEALTH_INDICATOR,
      useClass: TypeOrmHealthIndicator,
    },
  ],
})
export class HealthModule {}
