import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ISalesman, Salesman } from '../../../../entities/salesman';

import { ISalesmenRepository } from '../ISalesmenRepository';

export default class SalesmenRepository implements ISalesmenRepository {
  private repository: Repository<Salesman>;

  constructor() {
    this.repository = AppDataSource.getRepository(Salesman);
  }

  async create(salesman: ISalesman): Promise<void> {
    const salesmanToCreate = this.repository.create(salesman);
    this.repository.save(salesmanToCreate);
  }

  async update(id: string, data: ISalesman): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
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

  async findByCnpj(cnpj: string): Promise<Salesman> {
    return this.repository.findOne({
      where: [
        {
          cnpj,
        },
      ],
    });
  }

  async list(): Promise<Salesman[]> {
    return this.repository.find();
  }
}
