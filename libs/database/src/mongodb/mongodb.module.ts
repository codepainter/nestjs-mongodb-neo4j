import mongoose from 'mongoose';

import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { MongoDBConfigModule } from './config/config.module';
import { MongoDBConfigService } from './config/config.service';
import {
  MONGODB_CONNECTION,
  MONGOOSE_UNIT_OF_WORK_FACTORY,
} from './mongodb.constants';
import { MongooseUnitOfWorkFactory } from './unit-of-work/mongoose.unit-of-work.factory';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: MONGODB_CONNECTION,
      imports: [MongoDBConfigModule],
      inject: [MongoDBConfigService],
      useFactory: async (
        configSvc: MongoDBConfigService,
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
      provide: MONGODB_CONNECTION,
      useFactory: (): mongoose.Connection => mongoose.connection,
    },
  ],
  exports: [MONGOOSE_UNIT_OF_WORK_FACTORY, MONGODB_CONNECTION],
})
export class MongoDBModule {}
