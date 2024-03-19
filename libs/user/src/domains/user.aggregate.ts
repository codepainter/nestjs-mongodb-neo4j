import { AggregateRootBase } from '@app/shared/cqrs/aggregate-root.base';
import { PasswordUtil } from '@app/shared/utils/password.util';

import { UserCreatedEvent } from './events/user-created/user-created.event';

export type UserRequiredProps = Required<{
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type UserOptionalProps = Partial<{
  deletedAt: Date;
}>;

export type UserProps = UserRequiredProps & UserOptionalProps;

export type CreateUserProps = Omit<
  UserProps,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UserUpdatableProps = Partial<{
  name: string;
  email: string;
  password: string;
  updatedAt: Date;
}>;

export interface User {
  create(): Promise<void>;
  comparePassword: (password: string) => boolean;
  props: () => UserProps;
  commit: () => void;
}

export class UserAggregate extends AggregateRootBase implements User {
  private readonly id: string;
  private email: string;
  private name: string;
  private password: string;

  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: UserProps) {
    super();
    Object.assign(this, props);
  }

  async create(): Promise<void> {
    this.apply(new UserCreatedEvent(this.props()));
  }

  comparePassword(password: string): boolean {
    return PasswordUtil.compare(password, this.password);
  }

  props() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
