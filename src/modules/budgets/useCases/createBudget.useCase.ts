import { inject, injectable } from 'tsyringe';
import { IAdditionalItem } from '../../../entities/additionalItem';
import { IBudget } from '../../../entities/budget';
import { IProduct } from '../../../entities/product';
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

    budget.total_value = await this.calculateTotalValue(
      budget.products,
      budget.additional_items
    );

    await this.budgetsRepository.create(budget);
  }

  private async calculateTotalValue(
    products: IProduct[],
    additionalItems?: IAdditionalItem[]
  ): Promise<number> {
    const sum = [];
    const productsValue = products.map((product) => product.value);
    sum.push(...productsValue);

    if (additionalItems) {
      const additionalItemsValue = additionalItems.map(
        (additionalItem) => additionalItem.value
      );
      sum.push(...additionalItemsValue);
    }

    return sum.reduce((partialSum, a) => partialSum + a, 0);
  }
}
