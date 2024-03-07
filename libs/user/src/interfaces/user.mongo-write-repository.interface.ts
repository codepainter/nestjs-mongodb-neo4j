import { User, UserProps, UserUpdatableProps } from '../domains/user.aggregate';

export interface IUserMongoWriteRepository {
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
   * @return {*}  {(Promise<User>)}
   * @memberof IUserWriteRepository
   */
  findById(id: string): Promise<User>;

  /**
   *
   *
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof IUserWriteRepository
   */
  findByEmail(email: string): Promise<User>;

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
