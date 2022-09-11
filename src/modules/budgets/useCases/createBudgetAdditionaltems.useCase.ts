import { inject } from 'tsyringe';
import { Budget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

interface IRequest {
  budget_id: string;
  additional_items_ids: string[];
}

export default class CreateBudgetAdditionalItemsUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,

    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}
  async execute({
    budget_id,
    additional_items_ids,
  }: IRequest): Promise<Budget> {
    const budgetExists = await this.budgetsRepository.findById(budget_id);

    if (!budgetExists) {
      throw new AppError('Budget does not exists!');
    }

    const additionalItems = await this.additionalItemsRepository.findByIds(
      additional_items_ids
    );

    budgetExists.additional_items = additionalItems;

    await this.budgetsRepository.create(budgetExists);

    return budgetExists;
  }
}
