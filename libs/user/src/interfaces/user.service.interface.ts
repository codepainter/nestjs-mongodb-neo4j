import { UserVM } from '../vms/user.vm';

export interface IUserService {
  /**
   *
   *
   * @param {string} id
   * @return {*}  {(Promise<UserVM | undefined>)}
   * @memberof IUserService
   */
  getUserById(id: string): Promise<UserVM | undefined>;
}
