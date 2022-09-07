import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IBudget, Budget } from '../../../../entities/budget';

import { IBudgetsRepository } from '../IBudgetsRepository';

export default class BudgetsRepository implements IBudgetsRepository {
  private repository: Repository<Budget>;

  constructor() {
    this.repository = AppDataSource.getRepository(Budget);
  }

  async create(budget: IBudget): Promise<void> {
    const budgetToCreate = this.repository.create(budget);
    this.repository.save(budgetToCreate);
  }

  async updateBudget(budget: IBudget): Promise<void> {
    this.repository.save(budget);
  }

  async deleteBudget(budgetID: string): Promise<void> {
    this.repository.delete(budgetID);
  }

  async findById(budget_id: string): Promise<Budget> {
    return this.repository.findOne({
      where: [
        {
          id: budget_id,
        },
      ],
    });
  }

  async findByCode(code: string): Promise<Budget> {
    return this.repository.findOne({
      where: [
        {
          code,
        },
      ],
    });
  }
}
