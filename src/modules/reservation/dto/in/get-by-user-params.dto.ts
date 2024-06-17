import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetByUserParamsDto {
  @ApiProperty({
    description: 'Id of user',
    example: 1,
    type: Number,
  })
  @IsPositive()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  userId: number;
}
