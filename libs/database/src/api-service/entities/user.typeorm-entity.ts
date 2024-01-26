import { Column, Entity } from 'typeorm';

import { TypeOrmEntityBase } from '@app/shared/typeorm/typeorm-entity.base';

@Entity({ name: 'users' })
export class UserTypeOrmEntity extends TypeOrmEntityBase {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'bio', nullable: true })
  bio: string;
}
