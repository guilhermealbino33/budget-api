import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ISalesman, Salesman } from '../../../../entities/salesman';

import { ISalesmanRepository } from '../ISalesmanRepository';

export default class SalesmanRepository implements ISalesmanRepository {
  private repository: Repository<Salesman>;

  constructor() {
    this.repository = AppDataSource.getRepository(Salesman);
  }

  async create(salesman: ISalesman): Promise<void> {
    const salesmanToCreate = this.repository.create(salesman);
    this.repository.save(salesmanToCreate);
  }

  async updateSalesman(salesman: ISalesman): Promise<void> {
    this.repository.save(salesman);
  }

  async deleteSalesman(salesmanID: string): Promise<void> {
    this.repository.delete(salesmanID);
  }

  async findById(salesman_id: string): Promise<Salesman> {
    return this.repository.findOne({
      where: [
        {
          id: salesman_id,
        },
      ],
    });
  }

  async findByCpf(cpf: string): Promise<Salesman> {
    return this.repository.findOne({
      where: [
        {
          cpf,
        },
      ],
    });
  }
}