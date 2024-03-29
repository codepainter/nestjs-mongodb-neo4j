import { Expose } from 'class-transformer';

export class UserVM {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'email' })
  email: string;

  @Expose({ name: 'phone' })
  phone: string;

  constructor(props: UserVM) {
    Object.assign(this, props);
  }
}
