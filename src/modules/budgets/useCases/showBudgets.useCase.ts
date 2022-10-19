import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class ShowBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(budgetId?: string) {
    if (budgetId) {
      if (!isValidId(budgetId)) {
        throw new AppError('Invalid id!', 400);
      }

      const budget = await this.budgetsRepository.findById(budgetId);

      if (!budget) {
        throw new AppError('Budget not found!', 404);
      }

      return budget;
    }

    const budgets = await this.budgetsRepository.list();

    if (!budgets.length) {
      logging.debug('No budgets found!');
    }

    return budgets;
  }
}
