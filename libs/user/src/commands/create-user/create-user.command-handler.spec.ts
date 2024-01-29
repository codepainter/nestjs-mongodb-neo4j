import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { IUnitOfWorkFactory } from '@app/shared/unit-or-work/unit-of-work.interface';
import { UserAggregateStub } from '@app/test/user.stubs';
import { UserAggregate } from '@app/user/domains/user.aggregate';
import { UserAggregateFactory } from '@app/user/domains/user.factory';
import { IUserMongooseWriteRepository } from '@app/user/interfaces/user.mongoose.write-repository.interface';
import { IUserNeo4jWriteRepository } from '@app/user/interfaces/user.neo4j.write-repository';

import { CreateUserCommand } from './create-user.command';
import { CreateUserCommandHandler } from './create-user.command-handler';
import { CreateUserResult } from './create-user.result';

describe('CreateUserCommandHandler', () => {
  const logger = createMock<PinoLogger>();
  const factory = createMock<UserAggregateFactory>();
  const userWriteRepo = createMock<IUserMongooseWriteRepository>();
  const neo4jWriteRepository: IUserNeo4jWriteRepository =
    createMock<IUserNeo4jWriteRepository>();
  const neo4jUowJFactory: IUnitOfWorkFactory = createMock<IUnitOfWorkFactory>();

  const commandHandler = new CreateUserCommandHandler(
    logger,
    factory,
    userWriteRepo,
    neo4jWriteRepository,
    neo4jUowJFactory,
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

      const userCommitSpy = jest.spyOn(UserAggregate.prototype, 'commit');

      const execute = commandHandler.handleCommand(command);

      await expect(execute).resolves.toBeInstanceOf(CreateUserResult);
      expect(factoryCreateSpy).toBeCalledWith(command.props);
      expect(userCommitSpy).toBeCalledTimes(1);
    });
  });
});
