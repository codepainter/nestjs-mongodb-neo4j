import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE,
  USER_NEO4J_NODE_MODEL_SERVICE,
} from '@app/database/neo4j';
import { FollowRelationship } from '@app/database/neo4j/nodes/follow.relationship';
import { UserNode } from '@app/database/neo4j/nodes/user.node';
import { FollowNeo4jRelationshipModelService } from '@app/database/neo4j/services/follow.neo4j-relationship.model-service';
import { UserNeo4jNodeModelService } from '@app/database/neo4j/services/user.neo4j-node.model-service';
import { Inject, Injectable } from '@nestjs/common';

import { IFollowNeo4jWriteRepository } from '../interfaces/follow.neo4j-write-repository';

@Injectable()
export class FollowNeo4jWriteRepository implements IFollowNeo4jWriteRepository {
  constructor(
    @InjectPinoLogger(FollowNeo4jWriteRepository.name)
    readonly logger: PinoLogger,
    @Inject(USER_NEO4J_NODE_MODEL_SERVICE)
    readonly userNodeModelService: UserNeo4jNodeModelService,
    @Inject(FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE)
    readonly followRelationshipModelService: FollowNeo4jRelationshipModelService,
  ) {}

  async createFollowRelationship(
    userNode1: UserNode,
    userNode2: UserNode,
  ): Promise<void> {
    this.logger.trace(`createFollowRelationship()`);
    this.logger.debug({ userNode1, userNode2 }, 'Props');

    const followRelationship = new FollowRelationship({
      since: new Date(),
    });
    this.logger.debug({ followRelationship }, 'followRelationship');

    const result = await this.followRelationshipModelService
      .create(
        followRelationship,
        userNode1,
        userNode2,
        this.userNodeModelService,
        this.userNodeModelService,
        {
          merge: true,
          returns: true,
        },
      )
      .run();
    this.logger.debug({ result }, 'Result');
  }
}
