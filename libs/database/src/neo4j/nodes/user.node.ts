import { Node, NodeKey, NotNull, Unique } from '@nhogs/nestjs-neo4j';

@Node({ label: 'User' })
export class UserNode {
  @NodeKey()
  id: string;

  @NotNull()
  name: string;

  @NotNull()
  @Unique()
  email: string;

  @NotNull()
  createdAt: Date;

  constructor(props: UserNode) {
    Object.assign(this, props);
  }
}
