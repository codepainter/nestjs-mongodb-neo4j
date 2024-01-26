import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { UserAggregateDataStub } from '@app/test/stubs';
import { IUserWriteRepository } from '@app/user/interfaces/user.write-repository.interface';

import { UserCreatedEvent } from './user-created.event';
import { UserCreatedEventHandler } from './user-created.event-handler';

describe('UserCreatedEventHandler', () => {
  const logger = createMock<PinoLogger>();
  const userWriteRepo = createMock<IUserWriteRepository>();
  const eventHandler = new UserCreatedEventHandler(logger, userWriteRepo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleEvent', () => {
    it('should call userWriteRepo.create', async () => {
      const event = new UserCreatedEvent(UserAggregateDataStub());

      const userWriteRepoCreateSpy = jest
        .spyOn(userWriteRepo, 'create')
        .mockResolvedValue(undefined);

      const execute = eventHandler.handleEvent(event);

      await expect(execute).resolves.toBeUndefined();
      expect(userWriteRepoCreateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
