import { UserNode } from '@app/database/neo4j/nodes/user.node';

export interface IFollowService {
  createFollowRelationship(
    userNode1: UserNode,
    userNode2: UserNode,
  ): Promise<void>;
}
