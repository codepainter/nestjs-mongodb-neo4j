import { PinoLogger } from 'nestjs-pino';
import { createMock } from 'ts-auto-mock';

import { IAuthService } from '@app/auth/interfaces/auth.service.interface';
import { IUserService } from '@app/user/interfaces/user.service.interface';
import { UserVM } from '@app/user/vms/user.vm';

import { RefreshTokenQuery } from './refresh-token.query';
import { RefreshTokenQueryHandler } from './refresh-token.query-handler';
import { RefreshTokenQueryResult } from './refresh-token.result';

describe('RefreshTokenQueryHandler', () => {
  const logger: PinoLogger = createMock<PinoLogger>();
  const authService: IAuthService = createMock<IAuthService>();
  const userService: IUserService = createMock<IUserService>();

  const queryHandler = new RefreshTokenQueryHandler(
    logger,
    authService,
    userService,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleQuery()', () => {
    it('should return a RefreshTokenQueryResult', async () => {
      const query = createMock<RefreshTokenQuery>();

      const userServiceGetUserByIdSpy = jest
        .spyOn(userService, 'getUserById')
        .mockResolvedValueOnce(createMock<UserVM>());

      const authServiceGenerateAccessTokenSpy = jest
        .spyOn(authService, 'generateAccessToken')
        .mockResolvedValueOnce('accessToken');

      const authServiceGenerateRefreshTokenSpy = jest
        .spyOn(authService, 'generateRefreshToken')
        .mockResolvedValueOnce('refreshToken');

      const result = queryHandler.handleQuery(query);

      await expect(result).resolves.toBeInstanceOf(RefreshTokenQueryResult);
      expect(userServiceGetUserByIdSpy).toHaveBeenCalledTimes(1);
      expect(userServiceGetUserByIdSpy).toHaveBeenCalledWith(query.props.id);
      expect(authServiceGenerateAccessTokenSpy).toHaveBeenCalledTimes(1);
      expect(authServiceGenerateAccessTokenSpy).toHaveBeenCalledWith({
        id: expect.any(String),
      });
      expect(authServiceGenerateRefreshTokenSpy).toHaveBeenCalledTimes(1);
      expect(authServiceGenerateRefreshTokenSpy).toHaveBeenCalledWith({
        id: expect.any(String),
      });
    });
  });
});
