import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Currency } from '../currency.enum';

export class CreateTransactionResponseDto {
  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;
}
