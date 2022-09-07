import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

@injectable()
export default class DeleteSalesmanUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository
  ) {}

  async execute(salesmanId: string) {
    if (!isValidId(salesmanId)) {
      throw new AppError('Invalid salesman id!', 400);
    }

    const salesmanToDelete = await this.salesmanRepository.findById(salesmanId);

    if (!salesmanToDelete) {
      throw new AppError('Salesman not found!', 404);
    }

    await this.salesmanRepository.deleteSalesman(salesmanId);
  }
}
