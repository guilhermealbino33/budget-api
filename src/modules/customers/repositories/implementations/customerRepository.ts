import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ICustomer, Customer } from '../../../../entities/customer';

import { ICustomersRepository } from '../ICustomersRepository';

export default class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = AppDataSource.getRepository(Customer);
  }

  async create(customer: ICustomer): Promise<void> {
    const customerToCreate = this.repository.create(customer);
    this.repository.save(customerToCreate);
  }

  async updateCustomer(customer: ICustomer): Promise<void> {
    this.repository.save(customer);
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

  async list(): Promise<Customer[]> {
    return this.repository.find();
  }
}
