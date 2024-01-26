import { AggregateRootBase } from '@app/shared/cqrs/aggregate-root.base';

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
