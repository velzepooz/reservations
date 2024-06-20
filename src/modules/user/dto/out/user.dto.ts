import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The user id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The user username',
    example: 'troller12',
  })
  username: string;
}
