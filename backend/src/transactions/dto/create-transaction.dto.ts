import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { Currency } from '../currency.enum';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;

  @IsNotEmpty()
  @IsNumber()
  client_id: number;
}
