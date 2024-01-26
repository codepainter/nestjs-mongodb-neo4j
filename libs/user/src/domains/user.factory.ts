import { randomUUID } from 'crypto';

import { PasswordUtil } from '@app/shared/utils/password.util';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { CreateUserProps, UserAggregate, UserProps } from './user.aggregate';

@Injectable()
export class UserAggregateFactory {
  constructor(private publisher: EventPublisher) {}

  create(props: CreateUserProps, id?: string): UserAggregate {
    const now = new Date();
    return this.publisher.mergeObjectContext(
      new UserAggregate({
        id: id || randomUUID(),
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        name: props.name,
        email: props.email,
        phone: props.phone,
        password: PasswordUtil.hash(props.password),
        coachName: props.coachName,
        coachPhone: props.coachPhone,
        platinumName: props.platinumName,
      }),
    );
  }

  reconstitute(props: UserProps): UserAggregate {
    return this.publisher.mergeObjectContext(
      new UserAggregate({
        id: props.id,
        email: props.email,
        name: props.name,
        phone: props.phone,
        coachName: props.coachName,
        coachPhone: props.coachPhone,
        platinumName: props.platinumName,
        password: props.password,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }
}
