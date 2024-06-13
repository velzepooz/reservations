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
    return this._repository.find({
      where: {
        amenityId: amenityId,
        date: reservationDate,
      },
    });
  }
}
