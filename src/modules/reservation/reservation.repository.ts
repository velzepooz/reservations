import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IReservation } from './types/reservation-repository.types';

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
  ): Promise<IReservation[]> {
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
}
