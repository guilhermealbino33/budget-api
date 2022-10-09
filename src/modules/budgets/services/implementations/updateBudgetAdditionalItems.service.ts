import { inject, injectable } from 'tsyringe';
import { IBudget } from '../../../../entities/budget';
import { IBudgetAdditionalItems } from '../../../../entities/budgetAdditionalItems';
import { AppError } from '../../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../../additionalItems/repositories/IAdditionalItemsRepository';
import { IBudgetAdditionalItemsRepository } from '../../repositories/IBudgetAdditionalItemsRepository';
import { calculateProductTotalPrice } from '../../utils/calculateTotalValue';
import { IUpdateBudgetAdditionalItemsService } from '../IUpdateBudgetAdditionalItemsService';

@injectable()
export class UpdateBudgetAdditionalItemsService
  implements IUpdateBudgetAdditionalItemsService
{
  constructor(
    @inject('BudgetAdditionalItemsRepository')
    private budgetAdditionalItemsRepository: IBudgetAdditionalItemsRepository,
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(
    additional_items: IBudgetAdditionalItems[],
    budgetToUpdate: IBudget
  ) {
    for (const item of budgetToUpdate.additional_items) {
      await this.budgetAdditionalItemsRepository.delete(item.id);
    }

    for (const item of additional_items) {
      const itemToSend = await this.additionalItemsRepository.findById(
        item.additional_item_id
      );

      if (!itemToSend) {
        throw new AppError('Additional item not found!', 404);
      }

      item.total_price = calculateProductTotalPrice(
        item.unit_price,
        item.quantity,
        item.discount
      );

      item.budget_id = budgetToUpdate.id;
      await this.budgetAdditionalItemsRepository.create(item);
    }
  }
}
