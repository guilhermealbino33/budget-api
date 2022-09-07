import { inject, injectable } from 'tsyringe';
import { IBudget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class CreateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(budget: IBudget) {
    const budgetAlreadyExists = await this.budgetsRepository.findByCode(
      budget.code
    );

    if (budgetAlreadyExists) {
      throw new AppError('Budget already exists!', 409);
    }

    await this.budgetsRepository.create(budget);
  }
}
