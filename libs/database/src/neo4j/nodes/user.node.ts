import { Node, NodeKey, NotNull } from '@nhogs/nestjs-neo4j';

@Node({ label: 'User' })
export class UserNode {
  @NodeKey()
  id: string;

  @NotNull()
  name: string;

  @NotNull()
  email: string;

  @NotNull()
  createdAt: Date;

  constructor(props: UserNode) {
    Object.assign(this, props);
  }
}