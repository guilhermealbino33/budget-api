import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute(customerId: string) {
    if (!isValidId(customerId)) {
      throw new AppError('Invalid customer id!', 400);
    }

    const customerToDelete = await this.customersRepository.findById(
      customerId
    );

    if (!customerToDelete) {
      throw new AppError('Customer not found!', 404);
    }

    await this.customersRepository.deleteCustomer(customerId);
  }
}
