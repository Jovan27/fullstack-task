import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Client {
  @PrimaryColumn()
  id: number;

  @Column('real', { nullable: true })
  transaction_price?: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client, { eager: true })
  transactions: Transaction[];
}
