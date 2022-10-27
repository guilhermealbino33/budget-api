import { inject, injectable } from 'tsyringe';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

@injectable()
export default class CountBudgetsUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute() {
    return this.budgetsRepository.count();
  }
}
