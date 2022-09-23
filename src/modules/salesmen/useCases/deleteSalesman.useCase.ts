import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ISalesmenRepository } from '../repositories/ISalesmenRepository';

@injectable()
export default class DeleteSalesmanUseCase {
  constructor(
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository
  ) {}

  async execute(salesmanId: string) {
    if (!isValidId(salesmanId)) {
      throw new AppError('Invalid salesman id!', 400);
    }

    const salesmanToDelete = await this.salesmenRepository.findById(salesmanId);

    if (!salesmanToDelete) {
      throw new AppError('Salesman not found!', 404);
    }

    await this.salesmenRepository.deleteSalesman(salesmanId);
  }
}
