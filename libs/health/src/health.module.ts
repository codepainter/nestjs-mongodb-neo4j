import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import {  TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controllers/health.controller';
import { MongooseHealthIndicator } from './indicators/mongoose.health-indicator';

const HealthIndicators: Provider[] = [MongooseHealthIndicator];

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [...HealthIndicators],
})
export class HealthModule {}
