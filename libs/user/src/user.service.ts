import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Inject } from '@nestjs/common';

import { IUserReadRepository } from './interfaces/user.read-repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { USER_READ_REPOSITORY } from './user.constants';
import { UserVM } from './vms/user.vm';

export class UserService implements IUserService {
  constructor(
    @InjectPinoLogger(UserService.name) readonly logger: PinoLogger,
    @Inject(USER_READ_REPOSITORY)
    private readonly userReadRepo: IUserReadRepository,
  ) {}

  async getUserById(id: string): Promise<UserVM | undefined> {
    this.logger.info('getUserById()');
    this.logger.debug({ id }, 'Id');

    const user = await this.userReadRepo.findById(id);

    return user;
  }
}
