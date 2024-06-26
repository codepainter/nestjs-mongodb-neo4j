import { DateUtil } from '@app/shared/utils/date.util';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';

import { DATE_FORMAT } from '../neo4j.constants';
import { UserNode } from '../nodes/user.node';

@Injectable()
export class UserNeo4jNodeModelService extends Neo4jNodeModelService<UserNode> {
  label = 'User';
  protected logger: Logger = undefined;
  protected timestamp: string = undefined;

  constructor(@Inject(Neo4jService) readonly neo4jService: Neo4jService) {
    super();
  }

  toNeo4j(props: Partial<UserNode>): Record<string, any> {
    const result: Record<string, any> = { ...props };
    if (props.createdAt) {
      result.createdAt = DateUtil.toFormat(props.createdAt, DATE_FORMAT);
    }

    return super.toNeo4j(result);
  }

  fromNeo4j(record: Record<string, any>): UserNode {
    return new UserNode({
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: DateUtil.fromFormat(record.createdAt, DATE_FORMAT),
    });
  }

  async findByName(
    name: string,
    options?: {
      skip?: number;
      limit?: number;
      orderBy?: string;
      descending?: boolean;
    },
  ): Promise<UserNode[]> {
    return super.findBy({ name }, options).run();
  }
}
