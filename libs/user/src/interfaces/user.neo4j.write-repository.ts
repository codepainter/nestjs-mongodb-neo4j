import { UserProps } from '../domains/user.aggregate';

export interface IUserNeo4jWriteRepository {
  createNode(props: UserProps): Promise<void>;
}
