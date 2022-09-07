import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

@injectable()
export default class ShowSalesmanUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository
  ) {}

  async execute(salesmanId: string) {
    const salesman = await this.salesmanRepository.findById(salesmanId);

    if (!salesman) {
      throw new AppError('Salesman not found!', 404);
    }

    return salesman;
  }
}
