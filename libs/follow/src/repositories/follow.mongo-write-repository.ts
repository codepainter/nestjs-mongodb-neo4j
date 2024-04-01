import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { FOLLOW_MODEL, MONGODB_CONNECTION } from '@app/database/mongodb';
import {
  FollowModel,
  FollowSchema,
} from '@app/database/mongodb/schemas/follow.schema';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { FollowProps } from '../domains/follow.aggregate';
import { DuplicateFollowException } from '../exceptions/follow.exceptions';
import { IFollowMongoWriteRepository } from '../interfaces/follow.mongo-write-repository.interface';

@Injectable()
export class FollowMongoWriteRepository implements IFollowMongoWriteRepository {
  private model: FollowModel;

  constructor(
    @InjectPinoLogger(FollowMongoWriteRepository.name)
    readonly logger: PinoLogger,
    @InjectConnection(MONGODB_CONNECTION) readonly connection: Connection,
  ) {
    this.model = this.connection.model(FOLLOW_MODEL, FollowSchema);
  }

  async create(props: FollowProps): Promise<void> {
    this.logger.trace('create()');
    this.logger.debug({ props }, 'FollowProps');
    try {
      await this.model.create(props);
    } catch (error) {
      this.logger.error({ error }, 'Error');
      throw new DuplicateFollowException();
    }
  }
}
