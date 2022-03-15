import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService implements OnModuleInit {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  private async createInitialClients() {
    const clients: Client[] = [];

    for (let client_id = 1; client_id <= 50; client_id++) {
      const client = this.clientRepository.create({
        id: client_id,
        ...(client_id == 42 ? { transaction_price: 0.05 } : {}),
      });
      clients.push(client);
    }

    this.clientRepository.save(clients);
  }

  async onModuleInit() {
    const clients = await this.clientRepository.find();
    if (clients.length === 0) await this.createInitialClients();
  }
}
