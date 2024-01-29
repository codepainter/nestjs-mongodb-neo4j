import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  IUnitOfWork,
  IUnitOfWorkFactory,
} from '@app/shared/unit-or-work/unit-of-work.interface';
import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';

import { Neo4jUnitOfWork } from './neo4j.unit-of-work';

@Injectable()
export class Neo4jUnitOfWorkFactory implements IUnitOfWorkFactory {
  constructor(
    @InjectPinoLogger(Neo4jUnitOfWorkFactory.name)
    readonly logger: PinoLogger,
    protected readonly neo4jService: Neo4jService,
  ) {}

  makeUnitOfWork(name: string): IUnitOfWork {
    return new Neo4jUnitOfWork(name, this.logger, this.neo4jService);
  }
}
