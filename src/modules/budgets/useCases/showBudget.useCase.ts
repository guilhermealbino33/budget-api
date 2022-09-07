import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class ShowBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(budgetId: string) {
    const budget = await this.budgetsRepository.findById(budgetId);

    if (!budget) {
      throw new AppError('Budget not found!', 404);
    }

    return budget;
  }
}
