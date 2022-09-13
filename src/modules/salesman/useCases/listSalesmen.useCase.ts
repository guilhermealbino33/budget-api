import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

@injectable()
export default class ListSalesmenUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository
  ) {}

  async execute() {
    const salesman = await this.salesmanRepository.list();

    if (!salesman || !salesman.length) {
      throw new AppError('No salesman found!', 404);
    }

    return salesman;
  }
}
