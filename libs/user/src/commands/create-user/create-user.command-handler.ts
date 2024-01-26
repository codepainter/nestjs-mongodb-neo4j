import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { UserAggregateFactory } from '@app/user/domains/user.factory';
import { IUserWriteRepository } from '@app/user/interfaces/user.write-repository.interface';
import {
  USER_AGGREGATE_FACTORY,
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
    @Inject(USER_WRITE_REPOSITORY) readonly userWriteRepo: IUserWriteRepository,
  ) {
    super(logger);
  }

  async handleCommand(command: CreateUserCommand): Promise<CreateUserResult> {
    const user = this.factory.create({
      name: command.props.name,
      email: command.props.email,
      phone: command.props.phone,
      password: command.props.password,
      coachName: command.props.coachName,
      coachPhone: command.props.coachPhone,
      platinumName: command.props.platinumName,
    });

    await this.userWriteRepo.create(user.props());

    user.commit();

    return new CreateUserResult(user.props().id);
  }
}
