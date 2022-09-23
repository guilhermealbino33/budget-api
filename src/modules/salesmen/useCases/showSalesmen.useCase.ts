import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ISalesmenRepository } from '../repositories/ISalesmenRepository';

@injectable()
export default class ShowSalesmenUseCase {
  constructor(
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository
  ) {}

  async execute() {
    const salesman = await this.salesmenRepository.list();

    if (!salesman || !salesman.length) {
      throw new AppError('No salesman found!', 404);
    }

    return salesman;
  }
}
