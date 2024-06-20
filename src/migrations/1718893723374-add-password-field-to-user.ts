import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../modules/auth/utils/password.util';

export class AddPasswordFieldToUser1718893723374 implements MigrationInterface {
  name = 'AddPasswordFieldToUser1718893723374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultPassword = 'aA123456@';
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying`,
    );
    await queryRunner.query(
      `UPDATE "user" SET "password" = '${await hashPassword(defaultPassword)}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
