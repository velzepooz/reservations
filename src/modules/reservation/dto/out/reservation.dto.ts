import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty({
    description: 'Reservation id',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Amenity id',
    example: 'Restaurant',
    type: String,
  })
  amenityId: number;

  @ApiProperty({
    description: 'User id',
    example: 1,
    type: Number,
  })
  userId: number;

  @ApiProperty({
    description: 'Start time of reservation',
    example: 1609459200,
    type: Number,
  })
  startTime: number;

  @ApiProperty({
    description: 'End time of reservation',
    example: 1,
    type: Number,
  })
  endTime: number;

  @ApiProperty({
    description: 'Date of reservation',
    example: 1609459200,
    type: Number,
  })
  date: number;
}
