import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { UserAggregateFactory } from '@app/user/domains/user.aggregate-factory';
import { USER_AGGREGATE_FACTORY } from '@app/user/user.constants';
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
  ) {
    super(logger);
  }

  async handleCommand(command: CreateUserCommand): Promise<CreateUserResult> {
    const newUser = this.factory.create({
      name: command.props.name,
      email: command.props.email,
      password: command.props.password,
    });

    newUser.create();

    newUser.commit();

    return new CreateUserResult(newUser.props().id);
  }
}
