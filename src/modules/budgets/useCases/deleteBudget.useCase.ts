import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class DeleteBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(budgetId: string) {
    if (!isValidId(budgetId)) {
      throw new AppError('Invalid budget id!', 400);
    }

    const budgetToDelete = await this.budgetsRepository.findById(budgetId);

    if (!budgetToDelete) {
      throw new AppError('Budget not found!', 404);
    }

    await this.budgetsRepository.deleteBudget(budgetId);
  }
}
