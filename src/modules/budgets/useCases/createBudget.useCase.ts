import { inject, injectable } from 'tsyringe';
import { IBudget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import { calculateTotalValue } from '../services/calculateTotalValue';

interface ICreateBudget extends IBudget {
  products_id: string[];
  additional_items_id: string[];
}

@injectable()
export default class CreateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(budget: ICreateBudget) {
    const budgetAlreadyExists = await this.budgetsRepository.findByCode(
      budget.code
    );

    if (budgetAlreadyExists) {
      throw new AppError('Budget already exists!', 409);
    }

    const products = await this.productsRepository.findByIds(
      budget.products_id
    );

    if (!products) {
      throw new AppError('Budget must have at least one product!', 400);
    } else {
      budget.products = products;
    }

    const additionalItems = await this.additionalItemsRepository.findByIds(
      budget.additional_items_id
    );

    if (additionalItems) {
      budget.additional_items = additionalItems;
    }

    budget.total_value = await calculateTotalValue(budget);

    await this.budgetsRepository.create(budget);
  }
}
