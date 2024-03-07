import { UserNode } from '@app/database/neo4j/nodes/user.node';

export interface IFollowNeo4jWriteRepository {
  createFollowRelationship(
    userNode1: UserNode,
    userNode2: UserNode,
  ): Promise<void>;
}
