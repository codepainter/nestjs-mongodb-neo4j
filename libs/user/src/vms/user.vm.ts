import { Expose } from 'class-transformer';

export class UserVM {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  @Expose({ name: 'bio' })
  bio: string;

  constructor(props: UserVM) {
    Object.assign(this, props);
  }
}
