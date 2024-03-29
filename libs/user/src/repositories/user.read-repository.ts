import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  API_DB_CONNECTION,
  USER_MODEL,
} from '@app/database/api-mongoose.constants';
import {
  UserDocument,
  UserModel,
  UserSchema,
} from '@app/database/api-service/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { UserNotFoundException } from '../errors/user.errors';
import { IUserReadRepository } from '../interfaces/user.read-repository.interface';
import { UserVM } from '../vms/user.vm';

@Injectable()
export class UserReadRepository implements IUserReadRepository {
  private model: UserModel;

  constructor(
    @InjectPinoLogger(UserReadRepository.name) readonly logger: PinoLogger,
    @InjectConnection(API_DB_CONNECTION) readonly connection: Connection,
  ) {
    this.model = this.connection.model(USER_MODEL, UserSchema);
  }

  async findById(id: string): Promise<UserVM> {
    this.logger.trace('findById()');
    this.logger.debug({ id }, 'Props');

    const user = await this.model.findOne({ id }).exec();
    if (!user) throw new UserNotFoundException({ id });

    return this.toVM(user);
  }

  private toVM(doc: UserDocument): UserVM {
    return new UserVM({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
    });
  }
}
