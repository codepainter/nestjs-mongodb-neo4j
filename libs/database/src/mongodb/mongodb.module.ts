import mongoose from 'mongoose';

import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { ApiMongooseConfigModule } from './config/config.module';
import { ApiMongooseConfigService } from './config/config.service';
import {
  API_DB_CONNECTION,
  MONGOOSE_UNIT_OF_WORK_FACTORY,
} from './mongodb.constants';
import { MongooseUnitOfWorkFactory } from './unit-of-work/mongoose.unit-of-work.factory';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: API_DB_CONNECTION,
      imports: [ApiMongooseConfigModule],
      inject: [ApiMongooseConfigService],
      useFactory: async (
        configSvc: ApiMongooseConfigService,
      ): Promise<MongooseModuleFactoryOptions> => {
        mongoose.set('debug', !configSvc.isProduction);
        return {
          uri: configSvc.uri,
        };
      },
    }),
  ],
  providers: [
    {
      provide: MONGOOSE_UNIT_OF_WORK_FACTORY,
      useClass: MongooseUnitOfWorkFactory,
    },
    {
      provide: API_DB_CONNECTION,
      useFactory: (): mongoose.Connection => mongoose.connection,
    },
  ],
  exports: [MONGOOSE_UNIT_OF_WORK_FACTORY, API_DB_CONNECTION],
})
export class MongoDBModule {}
