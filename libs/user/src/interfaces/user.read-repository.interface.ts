import { UserVM } from '../vms/user.vm';

export interface IUserReadRepository {
  /**
   *
   *
   * @param {string} id
   * @return {*}  {(Promise<UserVM | undefined>)}
   * @memberof IUserReadRepository
   */
  findById(id: string): Promise<UserVM | undefined>;
}
