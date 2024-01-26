import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { EmailOrPhoneRequiredException } from '@app/auth/errors/auth.error';
import { IAuthService } from '@app/auth/interfaces/auth.service.interface';
import { UserAggregateStub } from '@app/test/user.stubs';
import { UserAggregate } from '@app/user/domains/user.aggregate';
import { IUserService } from '@app/user/interfaces/user.service.interface';
import { faker } from '@faker-js/faker';

import { LoginCommand } from './login.command';
import { LoginCommandHandler } from './login.command-handler';
import { LoginResult } from './login.result';

describe('LoginCommandHandler', () => {
  const logger = createMock<PinoLogger>();
  const userService: IUserService = createMock<IUserService>();
  const authService: IAuthService = createMock<IAuthService>();

  const commandHandler = new LoginCommandHandler(
    logger,
    userService,
    authService,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleCommand', () => {
    it("should throw UserNotFoundException if user doesn't exist", async () => {
      const command: LoginCommand = createMock<LoginCommand>({
        props: {
          email: undefined,
          phone: undefined,
        },
      });

      const handle = commandHandler.handleCommand(command);

      await expect(handle).rejects.toThrowError(EmailOrPhoneRequiredException);
    });

    it('should return LoginResult with email', async () => {
      const command: LoginCommand = createMock<LoginCommand>({
        props: {
          email: faker.internet.exampleEmail(),
          phone: undefined,
        },
      });

      const userServiceGetAggregateByEmailSpy = jest
        .spyOn(userService, 'getAggregateByEmail')
        .mockResolvedValue(UserAggregateStub());

      const userServiceGetAggregateByPhoneSpy = jest.spyOn(
        userService,
        'getAggregateByPhone',
      );

      const userLoginWithPasswordSpy = jest
        .spyOn(UserAggregate.prototype, 'loginWithPassword')
        .mockReturnValue(undefined);

      const userCommitSpy = jest.spyOn(UserAggregate.prototype, 'commit');

      const authServiceGenerateAccessTokenSpy = jest.spyOn(
        authService,
        'generateAccessToken',
      );

      const authServiceGenerateRefreshTokenSpy = jest.spyOn(
        authService,
        'generateRefreshToken',
      );

      const handle = commandHandler.handleCommand(command);

      await expect(handle).resolves.toBeInstanceOf(LoginResult);
      expect(userServiceGetAggregateByEmailSpy).toBeCalledWith(
        command.props.email,
      );
      expect(userServiceGetAggregateByPhoneSpy).not.toBeCalled();
      expect(userLoginWithPasswordSpy).toBeCalledWith(command.props.password);
      expect(userCommitSpy).toBeCalled();
      expect(authServiceGenerateAccessTokenSpy).toBeCalled();
      expect(authServiceGenerateRefreshTokenSpy).toBeCalled();
    });

    it('should return LoginResult with phone', async () => {
      const command: LoginCommand = createMock<LoginCommand>({
        props: {
          email: undefined,
          phone: faker.phone.number(),
        },
      });

      const userServiceGetAggregateByEmailSpy = jest.spyOn(
        userService,
        'getAggregateByEmail',
      );

      const userServiceGetAggregateByPhoneSpy = jest
        .spyOn(userService, 'getAggregateByPhone')
        .mockResolvedValue(UserAggregateStub());

      const userLoginWithPasswordSpy = jest
        .spyOn(UserAggregate.prototype, 'loginWithPassword')
        .mockReturnValue(undefined);

      const userCommitSpy = jest.spyOn(UserAggregate.prototype, 'commit');

      const authServiceGenerateAccessTokenSpy = jest.spyOn(
        authService,
        'generateAccessToken',
      );

      const authServiceGenerateRefreshTokenSpy = jest.spyOn(
        authService,
        'generateRefreshToken',
      );

      const handle = commandHandler.handleCommand(command);

      await expect(handle).resolves.toBeInstanceOf(LoginResult);
      expect(userServiceGetAggregateByEmailSpy).not.toBeCalled();
      expect(userServiceGetAggregateByPhoneSpy).toBeCalledWith(
        command.props.phone,
      );
      expect(userLoginWithPasswordSpy).toBeCalledWith(command.props.password);
      expect(userCommitSpy).toBeCalled();
      expect(authServiceGenerateAccessTokenSpy).toBeCalled();
      expect(authServiceGenerateRefreshTokenSpy).toBeCalled();
    });
  });
});
