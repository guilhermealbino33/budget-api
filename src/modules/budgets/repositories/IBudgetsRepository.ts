import { IBudget, Budget } from '../../../entities/budget';

export interface IBudgetsRepository {
  create(budget: IBudget): Promise<Budget>;
  save(budget: Budget): Promise<void>;
  update(budget: IBudget): Promise<void>;
  delete(budgetID: string): Promise<void>;
  findById(budget_id: string): Promise<Budget>;
  list(): Promise<Budget[]>;
  findByCode(code: string): Promise<Budget>;
}
