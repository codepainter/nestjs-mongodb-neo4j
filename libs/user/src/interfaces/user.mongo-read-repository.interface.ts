import { UserVM } from '../vms/user.vm';

export interface IUserMongoReadRepository {
  /**
   *
   *
   * @param {string} id
   * @return {*}  {(Promise<UserVM>)}
   * @memberof IUserReadRepository
   */
  findById(id: string): Promise<UserVM>;

  findRandom(count?: number): Promise<UserVM[]>;

  findByUsername(username: string): Promise<UserVM>;

  findByEmail(email: string): Promise<UserVM>;
}
