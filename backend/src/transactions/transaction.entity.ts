import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Currency } from './currency.enum';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint')
  client_id: number;

  @Column('date')
  date: string;

  @Column('decimal', { precision: 18, scale: 2 })
  amount: number;

  @Column('char', { length: 3 })
  currency: Currency;

  @Column('decimal', { precision: 18, scale: 2 })
  amount_eur: number;

  @Column('decimal', { precision: 18, scale: 2 })
  commission: number;

  @ManyToOne(() => Client, (client) => client.transactions, { eager: false })
  client: Client;
}
