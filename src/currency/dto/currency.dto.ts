import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CurrencyDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  from: string;

  @IsString()
  @ApiProperty()
  to: string;
}
