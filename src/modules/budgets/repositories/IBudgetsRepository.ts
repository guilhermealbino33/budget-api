import { IBudget, Budget } from '../../../entities/budget';

export interface IBudgetsRepository {
  create(budget: IBudget): Promise<void>;
  updateBudget(budget: IBudget): Promise<void>;
  deleteBudget(budgetID: string): Promise<void>;
  findById(budget_id: string): Promise<Budget>;
  findByCode(code: string): Promise<Budget>;
}
