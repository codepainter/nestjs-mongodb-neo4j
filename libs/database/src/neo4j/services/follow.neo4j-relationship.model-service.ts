import { DateUtil } from '@app/shared/utils/date.util';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  Neo4jRelationshipModelService,
  Neo4jService,
} from '@nhogs/nestjs-neo4j';

import { DATE_FORMAT, RelationshipTypes } from '../neo4j.constants';
import { FollowRelationship } from '../nodes/follow.relationship';

@Injectable()
export class FollowNeo4jRelationshipModelService extends Neo4jRelationshipModelService<FollowRelationship> {
  label = RelationshipTypes.Follows;

  protected logger: Logger = undefined;
  protected timestamp: string = undefined;

  constructor(@Inject(Neo4jService) readonly neo4jService: Neo4jService) {
    super();
  }

  toNeo4j(props: Partial<FollowRelationship>): Record<string, any> {
    const result: Record<string, any> = { ...props };
    if (props.since) {
      result.since = DateUtil.toFormat(props.since, DATE_FORMAT);
    }
    return super.toNeo4j(result);
  }

  fromNeo4j(record: Record<string, any>): FollowRelationship {
    return new FollowRelationship({
      since: DateUtil.fromFormat(record.since, DATE_FORMAT),
    });
  }
}
