import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_CONSTRAINTS } from '../../constants/auth-constraints.constants';

export class SignUpDto {
  @ApiProperty({
    description: 'Username',
    example: 'filler12',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.USERNAME.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.USERNAME.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.USERNAME.REGEX)
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'asd123AS$',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.PASSWORD.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.PASSWORD.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.PASSWORD.REGEX)
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    example: 'asd123AS$',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.PASSWORD.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.PASSWORD.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.PASSWORD.REGEX)
  confirmPassword: string;
}
