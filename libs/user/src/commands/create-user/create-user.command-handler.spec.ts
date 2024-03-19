import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { UserAggregateStub } from '@app/test/user.stubs';
import { UserAggregate } from '@app/user/domains/user.aggregate';
import { UserAggregateFactory } from '@app/user/domains/user.aggregate-factory';

import { CreateUserCommand } from './create-user.command';
import { CreateUserCommandHandler } from './create-user.command-handler';
import { CreateUserResult } from './create-user.result';

describe('CreateUserCommandHandler', () => {
  const logger = createMock<PinoLogger>();
  const factory = createMock<UserAggregateFactory>();

  const commandHandler = new CreateUserCommandHandler(logger, factory);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleCommand', () => {
    it("should create a user and return the user's id", async () => {
      const command = createMock<CreateUserCommand>();

      const factoryCreateSpy = jest
        .spyOn(factory, 'create')
        .mockReturnValueOnce(UserAggregateStub());

      const userCommitSpy = jest.spyOn(UserAggregate.prototype, 'commit');

      const execute = commandHandler.handleCommand(command);

      await expect(execute).resolves.toBeInstanceOf(CreateUserResult);
      expect(factoryCreateSpy).toHaveBeenCalledWith(command.props);
      expect(userCommitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
