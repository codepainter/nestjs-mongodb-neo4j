import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  IUnitOfWork,
  IUnitOfWorkFactory,
} from '@app/shared/unit-or-work/unit-of-work.interface';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { API_DB_CONNECTION } from '../mongodb.constants';
import { MongooseUnitOfWork } from './mongoose.unit-or-work';

@Injectable()
export class MongooseUnitOfWorkFactory implements IUnitOfWorkFactory {
  constructor(
    @InjectPinoLogger(MongooseUnitOfWorkFactory.name)
    readonly logger: PinoLogger,
    @InjectConnection(API_DB_CONNECTION)
    private readonly connection: Connection,
  ) {}

  makeUnitOfWork(name: string): IUnitOfWork {
    return new MongooseUnitOfWork(name, this.logger, this.connection);
  }
}
