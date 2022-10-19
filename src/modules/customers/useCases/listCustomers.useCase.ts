import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class ListCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute() {
    const customer = await this.customersRepository.list();

    if (!customer || !customer.length) {
      logging.debug('No customers found!');
    }

    return customer;
  }
}
