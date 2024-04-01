import { UserNode } from '@app/database/neo4j/nodes/user.node';

export interface IUserNeo4jWriteRepository {
  createNode(props: UserNode): Promise<void>;
}
