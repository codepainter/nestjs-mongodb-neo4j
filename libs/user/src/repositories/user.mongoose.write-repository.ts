import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  MONGODB_CONNECTION,
  USER_MODEL,
} from '@app/database/mongodb/mongodb.constants';
import {
  UserDocument,
  UserModel,
  UserSchema,
} from '@app/database/mongodb/schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { User, UserProps, UserUpdatableProps } from '../domains/user.aggregate';
import { UserAggregateFactory } from '../domains/user.factory';
import {
  DuplicateKeyException,
  UserNotFoundException,
} from '../errors/user.errors';
import { IUserMongooseWriteRepository } from '../interfaces/user.mongoose.write-repository.interface';
import { USER_AGGREGATE_FACTORY } from '../user.constants';

@Injectable()
export class UserMongooseWriteRepository
  implements IUserMongooseWriteRepository
{
  private model: UserModel;

  constructor(
    @InjectPinoLogger(UserMongooseWriteRepository.name)
    private readonly logger: PinoLogger,
    @InjectConnection(MONGODB_CONNECTION) readonly connection: Connection,
    @Inject(USER_AGGREGATE_FACTORY) readonly factory: UserAggregateFactory,
  ) {
    this.model = this.connection.model(USER_MODEL, UserSchema);
  }

  async create(props: UserProps): Promise<void> {
    try {
      await this.model.create(props);
    } catch (error) {
      this.logger.error({ error }, 'Error');
      throw new DuplicateKeyException();
    }
  }

  async findById(id: string): Promise<User> {
    this.logger.trace(`findById()`);
    this.logger.debug({ id }, 'Props');

    const user = await this.model.findOne({ id });
    this.logger.debug({ user }, 'User');
    if (!user) throw new UserNotFoundException({ id });

    return this.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.trace(`findByEmail()`);
    this.logger.debug({ email }, 'Props');

    const user = await this.model.findOne({ email });
    this.logger.debug({ user }, 'User');
    if (!user) throw new UserNotFoundException({ email });

    return this.toDomain(user);
  }

  async update(id: string, props: Partial<UserUpdatableProps>): Promise<void> {
    this.logger.trace(`update()`);
    this.logger.debug({ id, props }, 'Props');

    await this.model.findOneAndUpdate({ id }, props);
  }

  async delete(id: string): Promise<void> {
    this.logger.trace(`delete()`);
    this.logger.debug({ id }, 'Props');

    await this.model.findOneAndDelete({ id });
  }

  private toDomain(doc: UserDocument): User {
    return this.factory.reconstitute({
      id: doc.id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    });
  }
}
