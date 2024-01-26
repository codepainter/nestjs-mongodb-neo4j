import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { UserAggregateStub } from '@app/test/stubs';
import { UserAggregate } from '@app/user/domains/user.aggregate';
import { UserAggregateFactory } from '@app/user/domains/user.factory';
import { IUserWriteRepository } from '@app/user/interfaces/user.write-repository.interface';

import { CreateUserCommand } from './create-user.command';
import { CreateUserCommandHandler } from './create-user.command-handler';
import { CreateUserResult } from './create-user.result';

describe('CreateUserCommandHandler', () => {
  const logger = createMock<PinoLogger>();
  const factory = createMock<UserAggregateFactory>();
  const userWriteRepo = createMock<IUserWriteRepository>();
  const commandHandler = new CreateUserCommandHandler(
    logger,
    factory,
    userWriteRepo,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleCommand', () => {
    it("should create a user and return the user's id", async () => {
      const command = createMock<CreateUserCommand>();

      const factoryCreateSpy = jest
        .spyOn(factory, 'create')
        .mockReturnValueOnce(UserAggregateStub());

      const userCreateSpy = jest.spyOn(UserAggregate.prototype, 'create');
      const userCommitSpy = jest.spyOn(UserAggregate.prototype, 'commit');

      const execute = commandHandler.handleCommand(command);

      await expect(execute).resolves.toBeInstanceOf(CreateUserResult);
      expect(factoryCreateSpy).toBeCalledWith(command.props);
      expect(userCreateSpy).toBeCalledTimes(1);
      expect(userCommitSpy).toBeCalledTimes(1);
    });
  });
});
