import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class ShowCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute(page: number, limit: number, id?: string, name?: string) {
    if (id) {
      if (!isValidId(id)) {
        throw new AppError('Invalid id!', 400);
      }

      const customer = await this.customersRepository.findById(id);

      if (!customer) {
        throw new AppError('Customer not found!', 404);
      }

      return customer;
    }

    if (name) {
      const salesmen = await this.customersRepository.findByName(
        page,
        limit,
        name
      );

      return salesmen;
    }

    const customers = await this.customersRepository.list(page, limit);

    if (!customers || !customers.content.length) {
      logging.debug('No customers found!');
    }

    return customers;
  }
}
