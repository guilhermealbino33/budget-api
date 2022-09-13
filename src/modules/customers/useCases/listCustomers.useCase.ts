import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
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
      throw new AppError('No customer found!', 404);
    }

    return customer;
  }
}
