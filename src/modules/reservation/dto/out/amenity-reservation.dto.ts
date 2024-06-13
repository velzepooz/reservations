import { ApiProperty } from '@nestjs/swagger';

export class AmenityReservationDto {
  @ApiProperty({
    description: 'IReservation id',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Amenity name',
    example: 'Restaurant',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Amenity name',
    example: '12:12',
    type: String,
  })
  startTime: string;

  @ApiProperty({
    description: 'Duration of reservation, in minutes',
    example: 120,
    type: Number,
  })
  duration: number;

  @ApiProperty({
    description: 'User id',
    example: 1,
    type: Number,
  })
  userId: number;
}
