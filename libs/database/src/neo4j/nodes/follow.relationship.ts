import { NotNull, Relationship } from '@nhogs/nestjs-neo4j';

@Relationship({ type: 'FOLLOWS' })
export class FollowRelationship {
  @NotNull()
  since: Date;

  constructor(props: Partial<FollowRelationship>) {
    Object.assign(this, props);
  }
}
