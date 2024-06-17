import { MigrationInterface, QueryRunner } from 'typeorm';
import { parseCsvFile } from './utils/parse-csv-file.util';
import process from 'process';

export class AddUserSeed1718617592304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await parseCsvFile(`${process.cwd()}/data/user.csv`);
    for (const user of users) {
      await queryRunner.query(
        `INSERT INTO "user" (id, username) VALUES ($1, $2)`,
        [user.Id, user.Username],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
