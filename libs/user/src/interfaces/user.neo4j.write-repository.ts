import { UserNode } from '@app/database/neo4j/nodes/user.node';

export interface IUserNeo4jWriteRepository {
  createNode(props: UserNode): Promise<void>;
  followUser(user1: UserNode, user2: UserNode): Promise<void>;
}
