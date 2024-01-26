import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, Repository } from 'typeorm';

import { API_DB_CONNECTION } from '@app/database/api-postgres.constants';
import { UserTypeOrmEntity } from '@app/database/api-service/entities/user.typeorm-entity';
import { Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import {
  UserAggregate,
  UserProps,
  UserUpdatableProps,
} from '../domains/user.aggregate';
import { UserAggregateFactory } from '../domains/user.factory';
import { IUserWriteRepository } from '../interfaces/user.write-repository.interface';
import { USER_AGGREGATE_FACTORY } from '../user.constants';

export class UserWriteRepository implements IUserWriteRepository {
  private repository: Repository<UserTypeOrmEntity>;

  constructor(
    @InjectPinoLogger(UserWriteRepository.name) readonly logger: PinoLogger,
    @InjectEntityManager(API_DB_CONNECTION) readonly manager: EntityManager,
    @Inject(USER_AGGREGATE_FACTORY) readonly factory: UserAggregateFactory,
  ) {
    this.repository = this.manager.getRepository(UserTypeOrmEntity);
  }

  async create(props: UserProps): Promise<void> {
    this.logger.info('create()');
    this.logger.debug({ props }, 'Props');
    await this.repository.insert(props);
  }

  async findById(id: string): Promise<UserAggregate | undefined> {
    this.logger.info('findById()');
    this.logger.debug({ id }, 'Id');
    const user = await this.repository.findOne({
      where: { id },
    });

    return user ? this.toDomain(user) : undefined;
  }

  async update(id: string, props: UserUpdatableProps): Promise<void> {
    this.logger.info('update()');
    this.logger.debug({ id, props }, 'Id, Props');
    await this.repository.update({ id }, props);
  }

  async delete(id: string): Promise<void> {
    this.logger.info('delete()');
    this.logger.debug({ id }, 'Id');
    await this.repository.delete({ id });
  }

  private toDomain(entity: UserTypeOrmEntity): UserAggregate {
    this.logger.info('toDomain()');
    this.logger.debug({ entity }, 'Entity');
    return this.factory.reconstitute(entity);
  }
}
