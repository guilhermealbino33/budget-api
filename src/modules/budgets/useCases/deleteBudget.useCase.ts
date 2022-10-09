import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IBudgetAdditionalItemsRepository } from '../repositories/IBudgetAdditionalItemsRepository';
import { IBudgetProductsRepository } from '../repositories/IBudgetProductsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class DeleteBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('BudgetProductsRepository')
    private budgetProductsRepository: IBudgetProductsRepository,
    @inject('BudgetAdditionalItemsRepository')
    private budgetAdditionalItemsRepository: IBudgetAdditionalItemsRepository
  ) {}

  async execute(budgetId: string) {
    if (!isValidId(budgetId)) {
      throw new AppError('Invalid budget id!', 400);
    }

    const budgetToDelete = await this.budgetsRepository.findById(budgetId);

    if (!budgetToDelete) {
      throw new AppError('Budget not found!', 404);
    }

    if (budgetToDelete.closed) {
      throw new AppError('A closed budget can not be deleted!', 400);
    }

    for (const product of budgetToDelete.products) {
      await this.budgetProductsRepository.delete(product.id);
    }

    if (budgetToDelete.additional_items.length) {
      for (const additional_item of budgetToDelete.additional_items) {
        await this.budgetAdditionalItemsRepository.delete(additional_item.id);
      }
    }

    await this.budgetsRepository.delete(budgetId);
  }
}
