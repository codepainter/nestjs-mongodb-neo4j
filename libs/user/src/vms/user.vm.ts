import { Exclude, Expose } from 'class-transformer';

export class UserVM {
  @Expose({ name: 'id' })
  readonly id: string;

  @Expose({ name: 'name' })
  readonly name: string;

  @Expose({ name: 'email' })
  readonly email: string;

  @Exclude()
  readonly password: string;

  constructor(props: UserVM) {
    Object.assign(this, props);
  }
}
