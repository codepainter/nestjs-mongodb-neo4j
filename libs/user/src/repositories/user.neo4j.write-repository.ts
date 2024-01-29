import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UserNode } from '@app/database/neo4j/nodes/user.node';
import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService, Query } from '@nhogs/nestjs-neo4j';

import { IUserNeo4jWriteRepository } from '../interfaces/user.neo4j.write-repository';

@Injectable()
export class UserNeo4jWriteRepository implements IUserNeo4jWriteRepository {
  constructor(
    @InjectPinoLogger(UserNeo4jWriteRepository.name)
    readonly logger: PinoLogger,
    @Inject(Neo4jService) readonly neo4jService: Neo4jService,
  ) {}

  async createNode(props: UserNode): Promise<void> {
    this.logger.trace(`createNode()`);
    this.logger.debug({ props }, 'Props');

    const query: Query<UserNode> = {
      cypher: `
        CREATE (user:User {id: $id, name: $name, email: $email})
        RETURN user`,
      parameters: {
        id: props.id,
        name: props.name,
        email: props.email,
      },
    };
    this.logger.debug({ query }, 'Query');
    await this.neo4jService.run(query, {
      write: true,
    });
  }
}
