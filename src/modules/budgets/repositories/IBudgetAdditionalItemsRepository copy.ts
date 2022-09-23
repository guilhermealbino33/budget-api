import { IBudgetAdditionalItems } from '../../../entities/budgetAdditionalItems';

export interface IBudgetAdditionalItemsRepository {
  save(budgetProduct: IBudgetAdditionalItems): Promise<void>;
  delete(budget_id: string): Promise<void>;
}
