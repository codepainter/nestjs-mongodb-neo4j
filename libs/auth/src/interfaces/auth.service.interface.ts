import { UserProps } from '@app/user/domains/user.aggregate';

export interface IAuthService {
  /**
   *
   *
   * @param {(Pick<UserProps, 'id'>)} userProps
   * @return {*}  {string}
   * @memberof IAuthService
   */
  generateAccessToken(userProps: Pick<UserProps, 'id'>): Promise<string>;

  /**
   *
   *
   * @param {(Pick<UserProps, 'id'>)} userProps
   * @return {*}  {string}
   * @memberof IAuthService
   */
  generateRefreshToken(userProps: Pick<UserProps, 'id'>): Promise<string>;

  /**
   *
   *
   * @param {string} token
   * @param {number} ttl
   * @return {*}  {Promise<void>}
   * @memberof IAuthService
   */
  cacheToken(token: string, ttl: number): Promise<void>;

  /**
   *
   *
   * @param {string} token
   * @return {*}  {Promise<boolean>}
   * @memberof IAuthService
   */
  isTokenCached(token: string): Promise<boolean>;

  /**
   *
   *
   * @param {string} token
   * @return {*}  {Promise<void>}
   * @memberof IAuthService
   */
  invalidateToken(token: string): Promise<void>;
}
