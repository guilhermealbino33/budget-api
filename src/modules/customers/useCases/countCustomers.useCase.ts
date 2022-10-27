import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class CountCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute() {
    return this.customersRepository.count();
  }
}
