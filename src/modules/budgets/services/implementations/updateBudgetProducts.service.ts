import { inject, injectable } from 'tsyringe';
import { IBudget } from '../../../../entities/budget';
import { IBudgetProducts } from '../../../../entities/budgetProducts';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { IBudgetProductsRepository } from '../../repositories/IBudgetProductsRepository';
import { calculateProductTotalPrice } from '../../utils/calculateTotalValue';
import { IUpdateBudgetProductsService } from '../IUpdateBudgetProductsService';

@injectable()
export class UpdateBudgetProductsService
  implements IUpdateBudgetProductsService
{
  constructor(
    @inject('BudgetProductsRepository')
    private budgetProductsRepository: IBudgetProductsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(products: IBudgetProducts[], budgetToUpdate: IBudget) {
    for (const item of budgetToUpdate.products) {
      await this.budgetProductsRepository.delete(item.id);
    }

    for (const item of products) {
      const itemToSend = await this.productsRepository.findById(
        item.product_id
      );

      if (!itemToSend) {
        throw new AppError('Product not found!', 404);
      }

      item.total_price = calculateProductTotalPrice(
        item.unit_price,
        item.quantity,
        item.discount
      );

      item.budget_id = budgetToUpdate.id;
      await this.budgetProductsRepository.create(item);
    }
  }
}
