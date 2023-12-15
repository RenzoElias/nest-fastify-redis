import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(12)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(12)
  password: string;
}

export type IUserAuthDto = Partial<RegisterAuthDto>;
