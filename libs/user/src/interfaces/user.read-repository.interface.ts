import { UserVM } from '../vms/user.vm';

export interface IUserReadRepository {
  /**
   *
   *
   * @param {string} id
   * @return {*}  {(Promise<UserVM>)}
   * @memberof IUserReadRepository
   */
  findById(id: string): Promise<UserVM>;
}
