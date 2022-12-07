import { ILike, Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ICustomer, Customer } from '../../../../entities/customer';
import Page from '../../../../shared/types/page';

import { ICustomersRepository } from '../ICustomersRepository';

export default class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = AppDataSource.getRepository(Customer);
  }

  async create(customer: ICustomer): Promise<Customer> {
    const customerToCreate = this.repository.create(customer);

    const createdCustomer = await this.repository.save(customerToCreate);

    return createdCustomer;
  }

  async update(id: string, data: ICustomer): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  async deleteCustomer(customerID: string): Promise<void> {
    this.repository.delete(customerID);
  }

  async findById(customer_id: string): Promise<Customer> {
    return this.repository.findOne({
      where: [
        {
          id: customer_id,
        },
      ],
    });
  }

  async findByCpf(cpf: string): Promise<Customer> {
    return this.repository.findOne({
      where: [
        {
          cpf,
        },
      ],
    });
  }

  async findByCnpj(cnpj: string): Promise<Customer> {
    return this.repository.findOne({
      where: [
        {
          cnpj,
        },
      ],
    });
  }

  async list(page: number, limit: number): Promise<Page<Customer>> {
    const skip = (page - 1) * limit;
    const customer = await this.repository.find({
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: customer, page, totalPages, totalDocuments };
  }

  async findByName(
    page: number,
    limit: number,
    nameSearch: string
  ): Promise<Page<Customer>> {
    const skip = (page - 1) * limit;
    const customer = await this.repository.find({
      where: { name: ILike(`%${nameSearch}%`) },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: customer, page, totalPages, totalDocuments };
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
