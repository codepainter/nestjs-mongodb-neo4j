import { Inject, Injectable, Logger } from '@nestjs/common';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';

import { UserNode } from '../nodes/user.node';

@Injectable()
export class UserNeo4jNodeModelService extends Neo4jNodeModelService<UserNode> {
  label = 'User';
  protected logger: Logger = undefined;
  protected timestamp: string = undefined;

  constructor(@Inject(Neo4jService) readonly neo4jService: Neo4jService) {
    super();
  }
}
