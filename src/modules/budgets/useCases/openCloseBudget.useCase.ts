import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class OpenCloseBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(id: string) {
    const budget = await this.budgetsRepository.findById(id);

    if (!budget) {
      throw new AppError('Budget not found!', 404);
    }

    let data = {};

    if (budget.closed) {
      data = { closed: false };

      return this.budgetsRepository.update(id, data);
    }

    data = { closed: true };

    return this.budgetsRepository.update(id, data);
  }
}
