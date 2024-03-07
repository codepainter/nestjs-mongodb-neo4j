import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE,
  USER_NEO4J_NODE_MODEL_SERVICE,
} from '@app/database/neo4j/neo4j.constants';
import { UserNode } from '@app/database/neo4j/nodes/user.node';
import { FollowNeo4jRelationshipModelService } from '@app/database/neo4j/services/follow.neo4j-relationship.model-service';
import { UserNeo4jNodeModelService } from '@app/database/neo4j/services/user.neo4j-node.model-service';
import { Inject, Injectable } from '@nestjs/common';

import { IUserNeo4jWriteRepository } from '../interfaces/user.neo4j.write-repository';

@Injectable()
export class UserNeo4jWriteRepository implements IUserNeo4jWriteRepository {
  constructor(
    @InjectPinoLogger(UserNeo4jWriteRepository.name)
    readonly logger: PinoLogger,
    @Inject(USER_NEO4J_NODE_MODEL_SERVICE)
    readonly userNodeModelService: UserNeo4jNodeModelService,
    @Inject(FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE)
    readonly followRelationshipModelService: FollowNeo4jRelationshipModelService,
  ) {}

  async createNode(props: UserNode): Promise<void> {
    this.logger.trace(`createNode()`);
    this.logger.debug({ props }, 'Props');
    const result = await this.userNodeModelService
      .create(props, { returns: true })
      .run();
    this.logger.debug({ result }, 'Result');
  }
}
