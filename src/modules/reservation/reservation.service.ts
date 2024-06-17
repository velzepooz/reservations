import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import {
  AmenityReservation,
  UserReservation,
} from './types/reservation-repository.types';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  getByAmenity(
    id: number,
    reservationDate: number,
  ): Promise<AmenityReservation[]> {
    return this.reservationRepository.findByAmenityIdAndReservationDate(
      id,
      reservationDate,
    );
  }

  async getByUser(userId: number): Promise<UserReservation[]> {
    return this.reservationRepository.findByUserIdAndGroupByDate(userId);
  }
}
