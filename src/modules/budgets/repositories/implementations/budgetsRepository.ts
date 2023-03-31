import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IBudget, Budget } from '../../../../entities/budget';
import Page from '../../../../shared/types/page';

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

  async update(id: string, data: IBudget): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
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

  async findByCode(code: number): Promise<Budget> {
    return this.repository.findOne({
      where: [
        {
          code,
        },
      ],
    });
  }

  async list(page: number, limit: number): Promise<Page<Budget>> {
    const skip = (page - 1) * limit;
    const budgets = await this.repository.find({
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: budgets, page, totalPages, totalDocuments };
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async countSales(): Promise<number> {
    return this.repository.countBy({ status: 'approved' });
  }
}
