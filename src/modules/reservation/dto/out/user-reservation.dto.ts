import { IReservation } from '../../types/reservation-repository.types';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationDto } from './reservation.dto';

export class UserReservationDto {
  @ApiProperty({
    description: 'Date of reservations',
    example: '2022-01-01',
    type: String,
  })
  date: string;

  @ApiProperty({
    description: 'Reservations of the user in the given date',
    type: [ReservationDto],
  })
  reservations: IReservation[];
}
