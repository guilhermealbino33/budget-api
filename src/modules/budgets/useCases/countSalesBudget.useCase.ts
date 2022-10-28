import { inject, injectable } from 'tsyringe';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class CountSalesBudgetsUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute() {
    return this.budgetsRepository.countSales();
  }
}
