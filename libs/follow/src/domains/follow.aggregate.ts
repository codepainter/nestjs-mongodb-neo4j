import { AggregateRootBase } from '@app/shared/cqrs/aggregate-root.base';

export type FollowRequiredProps = Required<{
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type FollowOptionalProps = Partial<{
  deletedAt: Date;
}>;

export type FollowProps = FollowRequiredProps & FollowOptionalProps;

export type CreateFollowProps = Omit<
  FollowProps,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface Follow {
  props: () => FollowProps;
  commit: () => void;
}

export class FollowAggregate extends AggregateRootBase implements Follow {
  private readonly id: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  private followerId: string;
  private followingId: string;

  constructor(props: FollowProps) {
    super();
    Object.assign(this, props);
  }

  props() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      followerId: this.followerId,
      followingId: this.followingId,
    };
  }
}
