import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import {
  CreateFollowProps,
  FollowAggregate,
  FollowProps,
} from './follow.aggregate';

@Injectable()
export class FollowAggregateFactory {
  constructor(private publisher: EventPublisher) {}

  create(props: CreateFollowProps, id?: string): FollowAggregate {
    const now = new Date();
    return this.publisher.mergeObjectContext(
      new FollowAggregate({
        id: id || randomUUID(),
        followerId: props.followerId,
        followingId: props.followingId,
        createdAt: now,
        updatedAt: now,
      }),
    );
  }

  reconstitute(props: FollowProps): FollowAggregate {
    return this.publisher.mergeObjectContext(
      new FollowAggregate({
        id: props.id,
        followerId: props.followerId,
        followingId: props.followingId,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }
}
