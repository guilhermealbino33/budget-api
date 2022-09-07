import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../../../entities/customer';
import { AppError } from '../../../shared/errors/AppError';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute(customer: ICustomer) {
    const customerAlreadyExists = await this.customersRepository.findByCpf(
      customer.cpf
    );

    if (customerAlreadyExists) {
      throw new AppError('Customer already exists!', 409);
    }

    await this.customersRepository.create(customer);
  }
}
