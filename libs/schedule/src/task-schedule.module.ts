import { MovieModule } from '@app/movie';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DbGraphSyncService } from './db-graph-sync/db-graph-sync.service';
import { TaskScheduleService } from './task-schedule.service';

@Module({
  imports: [ScheduleModule.forRoot(), MovieModule, UserModule],
  providers: [TaskScheduleService, DbGraphSyncService],
  exports: [TaskScheduleService],
})
export class TaskScheduleModule {}
