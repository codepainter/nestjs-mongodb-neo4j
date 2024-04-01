import { MovieNode } from '@app/database/neo4j/nodes/movie.node';
import { EventBase } from '@app/shared/cqrs/event.base';

export class MovieNodeCreatedEvent extends EventBase<MovieNode> {
  constructor(props: MovieNode) {
    super(props);
  }
}
