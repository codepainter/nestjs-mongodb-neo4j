import { createMock } from 'ts-auto-mock';

import { InvalidPasswordException } from '@app/auth/errors/auth.error';

import { UserAggregate, UserProps } from './user.aggregate';

describe('UserAggregate', () => {
  describe('loginWithPassword()', () => {
    it('should throw InvalidPasswordException if password is invalid', () => {
      const props: UserProps = createMock<UserProps>();
      const user = new UserAggregate(props);
      const password = 'password';

      const handle = () => user.loginWithPassword(password);

      expect(handle).toThrowError(InvalidPasswordException);
    });
  });
});
