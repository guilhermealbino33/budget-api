import { IBudgetProducts } from '../../../entities/budgetProducts';

export interface IBudgetProductsRepository {
  saveProduct(budgetProduct: IBudgetProducts): Promise<void>;
  saveBudgetId(budgetId: string): Promise<void>;
}
