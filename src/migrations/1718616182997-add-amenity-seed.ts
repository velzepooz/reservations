import { MigrationInterface, QueryRunner } from 'typeorm';
import { parseCsvFile } from './utils/parse-csv-file.util';
import process from 'process';

export class AddAmenitySeed1718616182997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const amenities = await parseCsvFile(`${process.cwd()}/data/amenity.csv`);
    for (const amenity of amenities) {
      await queryRunner.query(
        `INSERT INTO amenity (id, name) VALUES ($1, $2)`,
        [amenity.Id, amenity.Name],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
