import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IBudget, Budget } from '../../../../entities/budget';

import { IBudgetsRepository } from '../IBudgetsRepository';

export default class BudgetsRepository implements IBudgetsRepository {
  private repository: Repository<Budget>;

  constructor() {
    this.repository = AppDataSource.getRepository(Budget);
  }

  async create(budget: IBudget): Promise<Budget> {
    const budgetToCreate = this.repository.create(budget);

    return this.repository.save(budgetToCreate);
  }

  async save(budget: Budget): Promise<void> {
    this.repository.save(budget);
  }

  async update(budget: IBudget): Promise<void> {
    this.repository.save(budget);
  }

  async delete(budgetID: string): Promise<void> {
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

  async list(): Promise<Budget[]> {
    return this.repository.find();
  }
}
