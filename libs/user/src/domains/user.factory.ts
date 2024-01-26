import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { CreateUserProps, UserAggregate, UserProps } from './user.aggregate';

@Injectable()
export class UserAggregateFactory {
  constructor(private publisher: EventPublisher) {}

  create(props: CreateUserProps, id?: string) {
    const now = new Date();
    return this.publisher.mergeObjectContext(
      new UserAggregate({
        id: id || randomUUID(),
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        firstName: props.firstName,
        lastName: props.lastName,
        bio: props.bio,
      }),
    );
  }

  reconstitute(props: UserProps) {
    return this.publisher.mergeObjectContext(new UserAggregate(props));
  }
}
