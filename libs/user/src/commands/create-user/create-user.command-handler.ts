import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { UserAggregateFactory } from '@app/user/domains/user.factory';
import { IUserMongooseReadRepository } from '@app/user/interfaces/user.mongoose.read-repository.interface';
import {
  USER_AGGREGATE_FACTORY,
  USER_READ_REPOSITORY,
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
    @Inject(USER_READ_REPOSITORY)
    readonly userReadRepo: IUserMongooseReadRepository,
  ) {
    super(logger);
  }

  async handleCommand(command: CreateUserCommand): Promise<CreateUserResult> {
    const user = this.factory.create({
      name: command.props.name,
      email: command.props.email,
      password: command.props.password,
    });

    user.create();

    const randomUser = await this.userReadRepo.findRandom();
    this.logger.debug({ randomUser }, 'randomUser');

    // const uow = this.neo4jUowJFactory.makeUnitOfWork('CreateUserUow');

    // const work = async () => {
    // const randomUserNode = new UserNode({
    //   id: randomUser.id,
    //   name: randomUser.name,
    //   email: randomUser.email,
    // });
    // follow one random user
    // await this.neo4jWriteRepository.followUser(userNode, randomUserNode);
    // };

    // await uow.start();
    // await uow.complete(work);

    user.commit();

    return new CreateUserResult(user.props().id);
  }
}
