import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { NEO4J_UNIT_OF_WORK_FACTORY } from '@app/database/neo4j/neo4j.constants';
import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { IUnitOfWorkFactory } from '@app/shared/unit-or-work/unit-of-work.interface';
import { UserAggregateFactory } from '@app/user/domains/user.factory';
import { IUserMongooseWriteRepository } from '@app/user/interfaces/user.mongoose.write-repository.interface';
import { IUserNeo4jWriteRepository } from '@app/user/interfaces/user.neo4j.write-repository';
import {
  USER_AGGREGATE_FACTORY,
  USER_NEO4J_WRITE_REPOSITORY,
  USER_WRITE_REPOSITORY,
} from '@app/user/user.constants';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';
import { CreateUserResult } from './create-user.result';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends CommandHandlerBase<
  CreateUserCommand,
  CreateUserResult
> {
  constructor(
    @InjectPinoLogger(CreateUserCommandHandler.name)
    readonly logger: PinoLogger,
    @Inject(USER_AGGREGATE_FACTORY) readonly factory: UserAggregateFactory,
    @Inject(USER_WRITE_REPOSITORY)
    readonly userWriteRepo: IUserMongooseWriteRepository,
    @Inject(USER_NEO4J_WRITE_REPOSITORY)
    readonly neo4jWriteRepository: IUserNeo4jWriteRepository,
    @Inject(NEO4J_UNIT_OF_WORK_FACTORY)
    readonly neo4jUowJFactory: IUnitOfWorkFactory,
  ) {
    super(logger);
  }

  async handleCommand(command: CreateUserCommand): Promise<CreateUserResult> {
    const user = this.factory.create({
      name: command.props.name,
      email: command.props.email,
      password: command.props.password,
    });

    await this.userWriteRepo.create(user.props());

    const uow = this.neo4jUowJFactory.makeUnitOfWork('CreateUserUow');

    const work = () => {
      this.neo4jWriteRepository.createNode(user.props());
    };

    await uow.start();
    await uow.complete(work);

    user.commit();

    return new CreateUserResult(user.props().id);
  }
}
