import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Currency } from './currency.enum';
import { CreateTransactionResponseDto } from './dto/create-transaction-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

interface ExchangeRateApiResponse {
  rates: Record<Currency, number>;
}

const percentage = (num: number, percentage: number) => (num / 100) * percentage;

const roundToTwoDecimals = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

@Injectable()
export class TransactionsService {
  constructor(
    private httpService: HttpService,
    private transactionsRepository: TransactionsRepository,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  private async getAmountInEur(createTransactionDto: CreateTransactionDto): Promise<number> {
    const { date, amount, currency } = createTransactionDto;
    // TODO: Handle possible errors
    const { data } = await firstValueFrom(
      this.httpService.get<ExchangeRateApiResponse>(`https://api.exchangerate.host/${date}`),
    );
    const rate = data.rates[currency];
    return roundToTwoDecimals(Number(amount) / rate);
  }

  private async getTransactionCommission(amount_eur: number, client_id: number, date: string) {
    const getDefaultCommission = (): number => {
      const defaultCommission = percentage(amount_eur, 0.5);
      if (defaultCommission < 0.05) return 0.05;
      return defaultCommission;
    };

    const getClientCommissionDiscount = async (): Promise<number | null> => {
      const client = await this.clientsRepository.findOne(client_id);
      if (client && client.transaction_price) return client.transaction_price;
      return null;
    };

    const getTurnoverCommissionDiscount = async (): Promise<number | null> => {
      const [year, month] = date.split('-');
      const transactions = await this.transactionsRepository
        .createQueryBuilder('transaction')
        .where('EXTRACT(YEAR from transaction.date) = :year AND EXTRACT(MONTH from transaction.date) = :month', {
          year,
          month,
        })
        .getMany();
      const monthlyTransactionTurnover = transactions.reduce((acc, transaction) => {
        if (transaction.client_id !== client_id || transaction.date !== date) return acc;
        return acc + transaction.amount_eur;
      }, 0);
      if (monthlyTransactionTurnover > 1000) return 0.03;
      return null;
    };

    const commissions = [
      getDefaultCommission(),
      await getClientCommissionDiscount(),
      await getTurnoverCommissionDiscount(),
    ].filter((c): c is number => typeof c === 'number');

    return roundToTwoDecimals(Math.min(...commissions));
  }

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<CreateTransactionResponseDto> {
    const { date, amount, currency, client_id } = createTransactionDto;

    const amount_eur = currency === 'EUR' ? Number(amount) : await this.getAmountInEur(createTransactionDto);
    const commission = await this.getTransactionCommission(Number(amount_eur), client_id, date);

    const transaction = this.transactionsRepository.create({
      date,
      amount: Number(amount),
      currency,
      client_id,
      amount_eur,
      commission,
    });

    this.transactionsRepository.save(transaction);

    return {
      amount: commission.toFixed(2),
      currency: Currency.EUR,
    };
  }
}
