import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import {
  BudgetAdditionalItems,
  IBudgetAdditionalItems,
} from '../../../../entities/budgetAdditionalItems';
import { IBudgetAdditionalItemsRepository } from '../IBudgetAdditionalItemsRepository';

export default class BudgetAdditionalItemsRepository
  implements IBudgetAdditionalItemsRepository
{
  private repository: Repository<BudgetAdditionalItems>;

  constructor() {
    this.repository = AppDataSource.getRepository(BudgetAdditionalItems);
  }

  async create(budgetAdditionalItem: IBudgetAdditionalItems): Promise<void> {
    const budgetAdditionalItemsToCreate =
      this.repository.create(budgetAdditionalItem);
    this.repository.save(budgetAdditionalItemsToCreate);
  }

  async delete(budget_additional_item_id: string): Promise<void> {
    this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: budget_additional_item_id })
      .execute();
  }

  async update(id: string, item: IBudgetAdditionalItems): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(item)
      .where('budget_id = :id', { id })
      .execute();
  }

  async findByBudgetAndItemId(
    budget_id: string,
    item_id: string
  ): Promise<BudgetAdditionalItems> {
    return this.repository.findOneBy({
      budget_id,
      additional_item_id: item_id,
    });
  }
}
