import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, Repository } from 'typeorm';

import { API_DB_CONNECTION } from '@app/database/api-postgres.constants';
import { UserTypeOrmEntity } from '@app/database/api-service/entities/user.typeorm-entity';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { IUserReadRepository } from '../interfaces/user.read-repository.interface';
import { UserVM } from '../vms/user.vm';

@Injectable()
export class UserReadRepository implements IUserReadRepository {
  private repository: Repository<UserTypeOrmEntity>;
  constructor(
    @InjectPinoLogger(UserReadRepository.name) readonly logger: PinoLogger,
    @InjectEntityManager(API_DB_CONNECTION)
    private readonly manager: EntityManager,
  ) {
    this.repository = this.manager.getRepository(UserTypeOrmEntity);
  }

  async findById(id: string): Promise<UserVM | undefined> {
    this.logger.info('findById()');
    this.logger.debug({ id }, 'Id');

    const user = await this.repository.findOne({ where: { id } });

    return user ? this.toVM(user) : undefined;
  }

  private toVM(entity: UserTypeOrmEntity): UserVM {
    return new UserVM({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      bio: entity.bio,
    });
  }
}
