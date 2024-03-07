import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserNode } from '@app/database/neo4j/nodes/user.node';
import { Inject, Injectable } from '@nestjs/common';

import { FOLLOW_NEO4J_WRITE_REPOSITORY } from './follow.constants';
import { IFollowNeo4jWriteRepository } from './interfaces/follow.neo4j-write-repository';

@Injectable()
export class FollowService {
  constructor(
    @InjectPinoLogger(FollowService.name)
    readonly logger: PinoLogger,
    @Inject(FOLLOW_NEO4J_WRITE_REPOSITORY)
    readonly neo4jWriteRepo: IFollowNeo4jWriteRepository,
  ) {}

  async createFollowRelationship(
    userNode1: UserNode,
    userNode2: UserNode,
  ): Promise<void> {
    this.logger.trace(`createFollowRelationship()`);
    await this.neo4jWriteRepo.createFollowRelationship(userNode1, userNode2);
  }
}
