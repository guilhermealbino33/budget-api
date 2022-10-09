import { IBudget } from '../../../entities/budget';
import { IBudgetAdditionalItems } from '../../../entities/budgetAdditionalItems';

export interface IUpdateBudgetAdditionalItemsService {
  execute(
    additional_items: IBudgetAdditionalItems[],
    budgetToUpdate: IBudget
  ): Promise<void>;
}
