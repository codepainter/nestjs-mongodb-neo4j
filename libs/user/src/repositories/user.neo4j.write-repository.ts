import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE,
  USER_NEO4J_NODE_MODEL_SERVICE,
} from '@app/database/neo4j/neo4j.constants';
import { FollowRelationship } from '@app/database/neo4j/nodes/follow.relationship';
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

  // async createNode(props: UserNode): Promise<void> {
  //   this.logger.trace(`createNode()`);
  //   this.logger.debug({ props }, 'Props');

  //   const query: Query<UserNode> = {
  //     cypher: `
  //       CREATE (user:User {id: $id, name: $name, email: $email})
  //       RETURN user`,
  //     parameters: {
  //       id: props.id,
  //       name: props.name,
  //       email: props.email,
  //     },
  //   };
  //   this.logger.debug({ query }, 'Query');
  //   await this.neo4jService.run(query, {
  //     write: true,
  //   });
  // }

  async createNode(props: UserNode): Promise<void> {
    this.logger.trace(`createNode()`);
    this.logger.debug({ props }, 'Props');
    const result = await this.userNodeModelService
      .create(props, { returns: true })
      .run();
    this.logger.debug({ result }, 'Result');
  }

  async followUser(userNode1: UserNode, userNode2: UserNode): Promise<void> {
    this.logger.trace(`followUser()`);
    this.logger.debug({ user1: userNode1, user2: userNode2 }, 'Props');

    const followRelationship = new FollowRelationship({
      since: new Date(),
    });
    this.logger.debug({ followRelationship }, 'followRelationship');

    await this.followRelationshipModelService
      .create(
        followRelationship,
        userNode1,
        userNode2,
        this.userNodeModelService,
        this.userNodeModelService,
        {
          merge: true,
          returns: false,
        },
      )
      .run();
  }
}
