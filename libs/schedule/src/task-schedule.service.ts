import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class TaskScheduleService {
  constructor(
    @InjectPinoLogger(TaskScheduleService.name) readonly logger: PinoLogger,
  ) {}

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
