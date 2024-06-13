import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetByAmenityQueryDto {
  @ApiProperty({
    description: 'Id of amenity',
    example: 1,
    type: Number,
  })
  @IsPositive()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;

  @ApiProperty({
    description: 'Timestamp of reservation date',
    example: 1609459200,
    type: Number,
  })
  @IsPositive()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  reservationDate: number;
}
