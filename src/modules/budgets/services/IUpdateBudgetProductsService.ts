import { IBudget } from '../../../entities/budget';
import { IBudgetProducts } from '../../../entities/budgetProducts';

export interface IUpdateBudgetProductsService {
  execute(
    additional_items: IBudgetProducts[],
    budgetToUpdate: IBudget
  ): Promise<void>;
}
