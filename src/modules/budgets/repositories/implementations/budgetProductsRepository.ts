import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import {
  BudgetProducts,
  IBudgetProducts,
} from '../../../../entities/budgetProducts';
import { IBudgetProductsRepository } from '../IBudgetProductsRepository';

export default class BudgetProductsRepository
  implements IBudgetProductsRepository
{
  private repository: Repository<BudgetProducts>;

  constructor() {
    this.repository = AppDataSource.getRepository(BudgetProducts);
  }
  async save(budgetProduct: IBudgetProducts): Promise<void> {
    const budgetProductsToCreate = this.repository.create(budgetProduct);
    this.repository.save(budgetProductsToCreate);
  }
}
