import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { Inject, Logger } from '@nestjs/common';
import { MovieNode } from '../nodes/movie.node';
import { DATE_FORMAT } from '../neo4j.constants';
import { DateUtil } from '@app/shared/utils/date.util';

export class MovieNeo4jNodeModelService extends Neo4jNodeModelService<MovieNode> {
  label = 'Movie';
  protected logger: Logger = undefined;
  protected timestamp: string = undefined;

  constructor(@Inject(Neo4jService) readonly neo4jService: Neo4jService) {
    super();
  }

  toNeo4j(props: Partial<MovieNode>): Record<string, any> {
    const result: Record<string, any> = { ...props };
    if (props.createdAt) {
      result.createdAt = DateUtil.toFormat(props.createdAt, DATE_FORMAT);
    }

    return super.toNeo4j(result);
  }

  fromNeo4j(record: Record<string, any>): MovieNode {
    return new MovieNode({
      id: record.id,
      title: record.name,
      createdAt: DateUtil.fromFormat(record.createdAt, DATE_FORMAT),
    });
  }
}
