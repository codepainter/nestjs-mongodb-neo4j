import { AggregateRootBase } from '@app/shared/cqrs/aggregate-root.base';

import { UserCreatedEvent } from './events/user-created/user-created.event';

export type UserRequiredProps = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserOptionalProps = Partial<{
  bio: string;
  deletedAt: Date;
}>;

export type UserProps = UserRequiredProps & Required<UserOptionalProps>;

export type CreateUserProps = Omit<
  UserProps,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UserUpdatableProps = Partial<{
  firstName: string;
  lastName: string;
  bio: string;
  updatedAt: Date;
}>;

export interface User {
  commit: () => void;
}

export class UserAggregate extends AggregateRootBase implements User {
  private readonly id: string;
  private firstName: string;
  private lastName: string;
  private bio: string;

  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: UserProps) {
    super();
    Object.assign(this, props);
  }

  create(): void {
    this.apply(new UserCreatedEvent(this.props()));
  }

  props() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      bio: this.bio,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
