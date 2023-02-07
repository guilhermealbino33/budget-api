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

  async create(budgetProduct: IBudgetProducts): Promise<void> {
    const budgetProductsToCreate = this.repository.create(budgetProduct);
    this.repository.save(budgetProductsToCreate);
  }

  async delete(budget_product_id: string): Promise<void> {
    this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: budget_product_id })
      .execute();
  }

  async update(id: string, product: IBudgetProducts): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(product)
      .where('budget_id = :id', { id })
      .execute();
  }

  async findByProductId(product_id: string): Promise<IBudgetProducts[]> {
    return this.repository.find({
      where: [
        {
          product_id,
        },
      ],
    });
  }
}
