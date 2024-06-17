import { MigrationInterface, QueryRunner } from 'typeorm';
import { parseCsvFile } from './utils/parse-csv-file.util';
import process from 'process';

export class AddReservationSeed1718617735056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const reservations = await parseCsvFile(
      `${process.cwd()}/data/reservation.csv`,
    );
    for (const reservation of reservations) {
      await queryRunner.query(
        `INSERT INTO reservation (id, "amenityId", "userId", "startTime", "endTime", date) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          reservation.Id,
          reservation['Amenity id'],
          reservation['User id'],
          reservation['Start time'],
          reservation['End time'],
          reservation['Date'],
        ],
      );
    }

    await queryRunner.query(
      `SELECT setval('reservation_id_seq', (SELECT MAX(id) FROM reservation)) `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
