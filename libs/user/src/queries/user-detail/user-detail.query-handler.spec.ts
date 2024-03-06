import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { UserVMStub } from '@app/test/user.stubs';
import { UserNotFoundException } from '@app/user/exceptions/user.exceptions';
import { IUserMongooseReadRepository } from '@app/user/interfaces/user.mongoose.read-repository.interface';
import { faker } from '@faker-js/faker';

import { UserDetailsQuery } from './user-detail.query';
import { UserDetailsQueryHandler } from './user-detail.query-handler';
import { UserDetailsResult } from './user-detail.result';

describe('UserDetailQueryHandler', () => {
  const logger = createMock<PinoLogger>();
  const userReadRepo = createMock<IUserMongooseReadRepository>();
  const queryHandler = new UserDetailsQueryHandler(logger, userReadRepo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleQuery', () => {
    it('should throw an error if the user is not found', async () => {
      const query = new UserDetailsQuery({
        id: faker.string.uuid(),
      });

      const userReadRepoFindByIdSpy = jest
        .spyOn(userReadRepo, 'findById')
        .mockRejectedValue(new UserNotFoundException({ id: query.props.id }));

      const execute = queryHandler.handleQuery(query);

      await expect(execute).rejects.toThrow(UserNotFoundException);
      expect(userReadRepoFindByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a UserDetailsResult', async () => {
      const query = new UserDetailsQuery({
        id: faker.string.uuid(),
      });

      const userReadRepoFindByIdSpy = jest
        .spyOn(userReadRepo, 'findById')
        .mockResolvedValue(UserVMStub());

      const execute = queryHandler.handleQuery(query);

      await expect(execute).resolves.toBeInstanceOf(UserDetailsResult);
      expect(userReadRepoFindByIdSpy).toHaveBeenCalledTimes(1);
    });
  });
});
