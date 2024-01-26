import { User } from '../domains/user.aggregate';
import { UserVM } from '../vms/user.vm';

export interface IUserService {
  /**
   *
   *
   * @param {string} id
   * @return {*}  {(Promise<UserVM)}
   * @memberof IUserService
   */
  getAggregateByEmail(email: string): Promise<User>;

  /**
   *
   *
   * @param {string} phone
   * @return {*}  {Promise<UserVM>}
   * @memberof IUserService
   */
  getAggregateByPhone(phone: string): Promise<User>;

  /**
   *
   *
   * @param {string} id
   * @return {*}  {Promise<UserVM>}
   * @memberof IUserService
   */
  getUserById(id: string): Promise<UserVM>;
}
