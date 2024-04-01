import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Inject, Injectable } from '@nestjs/common';

import { User } from './domains/user.aggregate';
import { IUserMongoReadRepository } from './interfaces/user.mongo-read-repository.interface';
import { IUserMongoWriteRepository } from './interfaces/user.mongo-write-repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { USER_READ_REPOSITORY, USER_WRITE_REPOSITORY } from './user.constants';
import { UserVM } from './vms/user.vm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectPinoLogger(UserService.name) readonly logger: PinoLogger,
    @Inject(USER_WRITE_REPOSITORY)
    private readonly useWriteRepo: IUserMongoWriteRepository,
    @Inject(USER_READ_REPOSITORY)
    private readonly userReadRepo: IUserMongoReadRepository,
  ) {}

  async getAggregateByEmail(email: string): Promise<User> {
    this.logger.trace('getAggregateByEmail()');
    this.logger.debug({ email }, 'Email');

    const user = await this.useWriteRepo.findByEmail(email);

    return user;
  }

  async getUserById(id: string): Promise<UserVM> {
    this.logger.trace('getUserById()');
    this.logger.debug({ id }, 'Id');

    const user = await this.userReadRepo.findById(id);

    return user;
  }

  async getRandomUser(count?: number): Promise<UserVM[]> {
    this.logger.trace('getRandomUser()');

    return this.userReadRepo.findRandom(count);
  }

  async getUserVMByEmail(email: string): Promise<UserVM> {
    this.logger.trace('getUserVMById()');
    return this.userReadRepo.findByEmail(email);
  }
}
