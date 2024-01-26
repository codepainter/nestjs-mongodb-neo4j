import { MigrationInterface, QueryRunner } from 'typeorm';

import { userSeed } from '../seeds/user.seed';

export class seedUserTable1680377917768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('users', userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('users', {
      id: userSeed.id,
    });
  }
}
