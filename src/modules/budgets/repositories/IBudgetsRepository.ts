import { IBudget, Budget, IUpdateBudget } from '../../../entities/budget';
import Page from '../../../shared/types/page';

export interface IBudgetsRepository {
  create(budget: IBudget): Promise<Budget>;
  save(budget: Budget): Promise<void>;
  update(id: string, data: IUpdateBudget): Promise<void>;
  delete(budgetID: string): Promise<void>;
  findById(budget_id: string): Promise<Budget>;
  list(page: number, limit: number): Promise<Page<Budget>>;
  findByCode(code: string): Promise<Budget>;
  count(): Promise<number>;
  countSales(): Promise<number>;
}
