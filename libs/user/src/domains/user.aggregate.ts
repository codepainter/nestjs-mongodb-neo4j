import { InvalidPasswordException } from '@app/auth/errors/auth.error';
import { AggregateRootBase } from '@app/shared/cqrs/aggregate-root.base';
import { PasswordUtil } from '@app/shared/utils/password.util';

import { UserLoggedInEvent } from './events/user-logged-in/user-logged-in.event';
import { UserLoggedOutEvent } from './events/user-logged-out/user-logged-out.event';

export type UserRequiredProps = Required<{
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type UserOptionalProps = Partial<{
  coachName: string;
  coachPhone: string;
  platinumName: string;
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
  phone: string;
  coachName: string;
  coachPhone: string;
  platinumName: string;
  password: string;
  updatedAt: Date;
}>;

export interface User {
  loginWithPassword: (password: string) => void;
  props: () => UserProps;
  commit: () => void;
}

export class UserAggregate extends AggregateRootBase implements User {
  private readonly id: string;
  private email: string;
  private name: string;
  private phone: string;
  private coachName?: string;
  private coachPhone?: string;
  private platinumName?: string;
  private password: string;

  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: UserProps) {
    super();
    Object.assign(this, props);
  }

  loginWithPassword(password: string): void {
    const valid = PasswordUtil.compare(password, this.password);
    if (!valid) {
      throw new InvalidPasswordException();
    }
    this.apply(new UserLoggedInEvent({ id: this.id, email: this.email }));
  }

  logout(): void {
    this.apply(new UserLoggedOutEvent({ id: this.id, email: this.email }));
  }

  props() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      coachName: this.coachName,
      coachPhone: this.coachPhone,
      platinumName: this.platinumName,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
