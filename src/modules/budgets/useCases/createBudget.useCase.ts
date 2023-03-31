import { inject, injectable } from 'tsyringe';
import { Budget, IBudget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { ICustomersRepository } from '../../customers/repositories/ICustomersRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { ISalesmenRepository } from '../../salesmen/repositories/ISalesmenRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import {
  calculateProductTotalPrice,
  calculateTotalValue,
} from '../utils/calculateTotalValue';

@injectable()
export default class CreateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(budget: IBudget): Promise<Budget> {
    if (budget.code) {
      const budgetAlreadyExists = await this.budgetsRepository.findByCode(
        budget.code
      );

      if (budgetAlreadyExists) {
        throw new AppError('Budget already exists!', 409);
      }
    }

    for (const product of budget.products) {
      const productExists = await this.productsRepository.findById(
        product.product_id
      );

      if (!productExists) {
        throw new AppError('Product not found!', 404);
      }
    }

    if (!budget.customer_id) {
      throw new AppError('Budget must have a customer!', 400);
    }

    if (!budget.salesman_id) {
      throw new AppError('Budget must have a salesman!', 400);
    }

    const customerExists = await this.customersRepository.findById(
      budget.customer_id
    );

    const salesmenExists = await this.salesmenRepository.findById(
      budget.salesman_id
    );

    if (!salesmenExists) {
      throw new AppError('Salesman not found!', 404);
    }

    if (!customerExists) {
      throw new AppError('Customer not found!', 404);
    }

    if (!budget.products.length) {
      throw new AppError('Budget must have at least one product!', 400);
    }

    if (!budget.products.length) {
      throw new AppError('Budget must have at least one product!', 400);
    }

    for (const product of budget.products) {
      product.total_price = calculateProductTotalPrice(
        product.unit_price,
        product.quantity,
        product.discount
      );
    }

    if (budget.additional_items) {
      for (const item of budget.additional_items) {
        const additionalItemExists =
          await this.additionalItemsRepository.findById(
            item.additional_item_id
          );

        if (!additionalItemExists) {
          throw new AppError('Additional item not found!', 404);
        } else {
          item.total_price = calculateProductTotalPrice(
            item.unit_price,
            item.quantity,
            item.discount
          );
        }
      }
    }

    const createdBudget = await this.budgetsRepository.create(budget);

    createdBudget.total_value = await calculateTotalValue(createdBudget);

    await this.budgetsRepository.save(createdBudget);

    return createdBudget;
  }
}
