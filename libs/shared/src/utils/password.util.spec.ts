import { PasswordUtil } from './password.util';

describe('Password Util', () => {
  describe('hash', () => {
    it('should return a hashed password', () => {
      const password = 'password';
      const hashedPassword = PasswordUtil.hash(password);
      expect(hashedPassword).not.toBe(password);
    });
  });

  describe('compare', () => {
    it('should return true if the password matches', () => {
      const password = 'password';
      const hashedPassword = PasswordUtil.hash(password);
      expect(PasswordUtil.compare(password, hashedPassword)).toBeTruthy();
    });
  });

  describe('getRandomInt', () => {
    it('should return a random number', () => {
      const random = PasswordUtil['getRandomInt']();
      expect(random).toBeGreaterThanOrEqual(0);
      expect(random).toBeLessThanOrEqual(10);
    });
  });
});
