import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Inject, Injectable } from '@nestjs/common';

import { User } from './domains/user.aggregate';
import { IUserReadRepository } from './interfaces/user.read-repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { IUserWriteRepository } from './interfaces/user.write-repository.interface';
import { USER_READ_REPOSITORY, USER_WRITE_REPOSITORY } from './user.constants';
import { UserVM } from './vms/user.vm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectPinoLogger(UserService.name) readonly logger: PinoLogger,
    @Inject(USER_WRITE_REPOSITORY)
    private readonly useWriteRepo: IUserWriteRepository,
    @Inject(USER_READ_REPOSITORY)
    private readonly userReadRepo: IUserReadRepository,
  ) {}

  async getAggregateByEmail(email: string): Promise<User> {
    this.logger.trace('getAggregateByEmail()');
    this.logger.debug({ email }, 'Email');

    const user = await this.useWriteRepo.findByEmail(email);

    return user;
  }

  async getAggregateByPhone(phone: string): Promise<User> {
    this.logger.trace('getAggregateByPhone()');
    this.logger.debug({ phone }, 'Phone');

    const user = await this.useWriteRepo.findByPhone(phone);

    return user;
  }

  async getUserById(id: string): Promise<UserVM> {
    this.logger.trace('getUserById()');
    this.logger.debug({ id }, 'Id');

    const user = await this.userReadRepo.findById(id);

    return user;
  }
}
