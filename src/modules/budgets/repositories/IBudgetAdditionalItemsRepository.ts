import {
  BudgetAdditionalItems,
  IBudgetAdditionalItems,
} from '../../../entities/budgetAdditionalItems';

export interface IBudgetAdditionalItemsRepository {
  create(budgetProduct: IBudgetAdditionalItems): Promise<void>;
  delete(budget_id: string): Promise<void>;
  update(id: string, item: IBudgetAdditionalItems): Promise<void>;
  findByBudgetAndItemId(
    budget_id: string,
    item_id: string
  ): Promise<BudgetAdditionalItems>;
}
