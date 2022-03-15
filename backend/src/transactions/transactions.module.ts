import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Client } from '../clients/client.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TransactionsRepository, Client])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
