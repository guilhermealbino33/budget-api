import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { Budget, IBudget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IBudgetAdditionalItemsRepository } from '../repositories/IBudgetAdditionalItemsRepository copy';
import { IBudgetProductsRepository } from '../repositories/IBudgetProductsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import {
  calculateProductTotalPrice,
  calculateTotalValue,
} from '../services/calculateTotalValue';

@injectable()
export default class CreateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('BudgetProductsRepository')
    private budgetProductsRepository: IBudgetProductsRepository,
    @inject('BudgetAdditionalItemsRepository')
    private budgetAdditionalItemsRepository: IBudgetAdditionalItemsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(budget: IBudget) {
    budget.id = uuid();

    const budgetAlreadyExists = await this.budgetsRepository.findByCode(
      budget.code
    );

    if (budgetAlreadyExists) {
      throw new AppError('Budget already exists!', 409);
    }

    if (!budget.products.length) {
      throw new AppError('Budget must have at least one product!', 400);
    }

    const createdBudget = await this.budgetsRepository.create(budget);

    await this.addProduct(createdBudget);

    if (createdBudget.additional_items.length) {
      await this.addAdditionalItem(createdBudget);
    }

    createdBudget.total_value = await calculateTotalValue(createdBudget);

    await this.budgetsRepository.save(createdBudget);
  }

  private async addAdditionalItem(createdBudget: Budget) {
    for (const product of createdBudget.products) {
      const productExists = await this.productsRepository.findById(product.id);

      if (!productExists) {
        throw new AppError(`Product with id ${product.id} not found!`, 404);
      }

      const budgetProduct = {
        budget_id: createdBudget.id,
        product_id: product.id,
        quantity: product.quantity,
        unit_price: product.unit_price,
        discount: product.discount,
        total_price: calculateProductTotalPrice(product),
      };

      await this.budgetProductsRepository.save(budgetProduct);
    }
  }

  private async addProduct(createdBudget: Budget) {
    for (const additional_item of createdBudget.additional_items) {
      const additionalItemExists =
        await this.additionalItemsRepository.findById(additional_item.id);

      if (!additionalItemExists) {
        throw new AppError(
          `Additional item with id ${additionalItemExists.id} not found!`,
          404
        );
      }

      const budgetAdditionalItems = {
        budget_id: createdBudget.id,
        additional_item_id: additional_item.id,
        quantity: additional_item.quantity,
        unit_price: additional_item.unit_price,
        discount: additional_item.discount,
        total_price: calculateProductTotalPrice(additional_item),
      };

      await this.budgetAdditionalItemsRepository.save(budgetAdditionalItems);
    }
  }
}
