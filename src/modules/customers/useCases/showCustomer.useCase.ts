import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class ShowCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute(customerId: string) {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found!', 404);
    }

    return customer;
  }
}
