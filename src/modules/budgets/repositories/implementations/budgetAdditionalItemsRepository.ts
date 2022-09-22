import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import {
  BudgetAdditionalItems,
  IBudgetAdditionalItems,
} from '../../../../entities/budgetAdditionalItems';
import { IBudgetAdditionalItemsRepository } from '../IBudgetAdditionalItemsRepository copy';

export default class BudgetAdditionalItemsRepository
  implements IBudgetAdditionalItemsRepository
{
  private repository: Repository<BudgetAdditionalItems>;

  constructor() {
    this.repository = AppDataSource.getRepository(BudgetAdditionalItems);
  }
  async save(budgetAdditionalItem: IBudgetAdditionalItems): Promise<void> {
    const budgetAdditionalItemsToCreate =
      this.repository.create(budgetAdditionalItem);
    this.repository.save(budgetAdditionalItemsToCreate);
  }
}
