import { inject } from 'tsyringe';
import { Budget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

interface IRequest {
  budget_id: string;
  product_ids: string[];
}

export default class CreateBudgetProductsUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute({ budget_id, product_ids }: IRequest): Promise<Budget> {
    const budgetExists = await this.budgetsRepository.findById(budget_id);

    if (!budgetExists) {
      throw new AppError('Budget does not exists!');
    }

    const products = await this.productsRepository.findByIds(product_ids);
    budgetExists.products = products;

    await this.budgetsRepository.create(budgetExists);

    return budgetExists;
  }
}
