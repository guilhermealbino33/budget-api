import { IBudgetProducts } from '../../../entities/budgetProducts';

export interface IBudgetProductsRepository {
  save(budgetProduct: IBudgetProducts): Promise<void>;
}
