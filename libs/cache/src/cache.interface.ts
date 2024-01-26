export interface ICacheService {
  /**
   *
   *
   * @template T
   * @param {string} key
   * @return {*}  {(Promise<T | undefined>)}
   * @memberof ICacheService
   */
  get<T>(key: string): Promise<T | undefined>;

  /**
   *
   *
   * @template T
   * @param {string} key
   * @param {T} value
   * @param {number} [ttl]
   * @return {*}  {Promise<void>}
   * @memberof ICacheService
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   *
   *
   * @param {string} key
   * @return {*}  {Promise<void>}
   * @memberof ICacheService
   */
  del(key: string): Promise<void>;

  /**
   *
   *
   * @template T
   * @param {string} key
   * @param {() => Promise<T>} fn
   * @param {number} [ttl]
   * @return {*}  {Promise<T>}
   * @memberof ICacheService
   */
  wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T>;
}
