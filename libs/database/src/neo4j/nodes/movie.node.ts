import { Node, NodeKey, NotNull } from '@nhogs/nestjs-neo4j';

@Node({ label: 'Movie' })
export class MovieNode {
  @NodeKey()
  id: string;

  @NotNull()
  title: string;

  @NotNull()
  createdAt: Date;

  constructor(props: MovieNode) {
    Object.assign(this, props);
  }
}
