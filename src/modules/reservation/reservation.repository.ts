import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AmenityReservation,
  UserReservation,
} from './types/reservation-repository.types';

@Injectable()
export class ReservationRepository extends Repository<Reservation> {
  constructor(
    @InjectRepository(Reservation)
    private _repository: Repository<Reservation>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }

  async findByAmenityIdAndReservationDate(
    amenityId: number,
    reservationDate: number,
  ): Promise<AmenityReservation[]> {
    return this._repository.query(
      `SELECT
           r.id,
           r."userId",
           a.name,
           to_char(MAKE_INTERVAL(mins => r."startTime"), 'HH24:MI') AS "startTime",
           (r."endTime" - r."startTime") AS "durationMinutes"
       FROM reservation as r
                LEFT JOIN "amenity" as a ON r."amenityId" = a.id
       WHERE r."amenityId" = $1 AND r."date" = $2
       ORDER BY r."startTime" ASC;`,
      [amenityId, reservationDate],
    );
  }

  async findByUserIdAndGroupByDate(userId: number): Promise<UserReservation[]> {
    return this._repository.query(
      `
      SELECT
          TO_CHAR(TO_TIMESTAMP("date" / 1000), 'YYYY-MM-DD') AS date,
          json_agg(row_to_json(reservation)) AS reservations
      FROM reservation
      WHERE "userId" = $1
      GROUP BY date;
    `,
      [userId],
    );
  }
}
