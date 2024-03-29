import { IBudgetProducts } from '../../../entities/budgetProducts';

export interface IBudgetProductsRepository {
  create(budgetProduct: IBudgetProducts): Promise<void>;
  delete(budget_product_id: string): Promise<void>;
  update(id: string, product: IBudgetProducts): Promise<void>;
  findByProductId(product_id: string): Promise<IBudgetProducts[]>;
}
