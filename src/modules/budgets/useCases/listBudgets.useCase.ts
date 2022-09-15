import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class ListBudgetsUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute() {
    const budget = await this.budgetsRepository.list();

    if (!budget) {
      throw new AppError('No budget found!', 404);
    }

    return budget;
  }
}
