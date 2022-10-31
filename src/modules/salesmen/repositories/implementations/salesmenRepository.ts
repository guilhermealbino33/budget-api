import { ILike, Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ISalesman, Salesman } from '../../../../entities/salesman';
import Page from '../../../../shared/types/page';

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

  async list(page: number, limit: number): Promise<Page<Salesman>> {
    const skip = (page - 1) * limit;
    const salesmen = await this.repository.find({
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: salesmen, page, totalPages, totalDocuments };
  }

  async findByName(
    page: number,
    limit: number,
    nameSearch: string
  ): Promise<Page<Salesman>> {
    const skip = (page - 1) * limit;
    const salesmen = await this.repository.find({
      where: { name: ILike(`%${nameSearch}%`) },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: salesmen, page, totalPages, totalDocuments };
  }
}
