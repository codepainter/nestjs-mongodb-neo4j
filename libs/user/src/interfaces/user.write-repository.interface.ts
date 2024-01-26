import {
  UserAggregate,
  UserProps,
  UserUpdatableProps,
} from '../domains/user.aggregate';

export interface IUserWriteRepository {
  /**
   *
   *
   * @param {UserProps} props
   * @return {*}  {Promise<void>}
   * @memberof IUserWriteRepository
   */
  create(props: UserProps): Promise<void>;

  /**
   *
   *
   * @param {string} id
   * @return {*}  {(Promise<UserAggregate | undefined>)}
   * @memberof IUserWriteRepository
   */
  findById(id: string): Promise<UserAggregate | undefined>;

  /**
   *
   *
   * @param {string} id
   * @param {UserUpdatableProps} props
   * @return {*}  {Promise<void>}
   * @memberof IUserWriteRepository
   */
  update(id: string, props: UserUpdatableProps): Promise<void>;

  /**
   *
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof IUserWriteRepository
   */
  delete(id: string): Promise<void>;
}
