import { inject, injectable } from 'tsyringe';
import { IBudget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { ICustomersRepository } from '../../customers/repositories/ICustomersRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { ISalesmenRepository } from '../../salesmen/repositories/ISalesmenRepository';
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
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
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
    const budgetAlreadyExists = await this.budgetsRepository.findByCode(
      budget.code
    );

    if (budgetAlreadyExists) {
      throw new AppError('Budget already exists!', 409);
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

    budget.total_value = 0;

    const createdBudget = await this.budgetsRepository.create(budget);

    await this.addProduct(budget, createdBudget.id);

    if (budget.additional_items) {
      await this.addAdditionalItem(budget, createdBudget.id);
    }

    createdBudget.total_value = await calculateTotalValue(budget);

    await this.budgetsRepository.save(createdBudget);
  }

  private async addProduct(budget: IBudget, createdBudgetId: string) {
    for (const product of budget.products) {
      const productExists = await this.productsRepository.findById(product.id);

      if (!productExists) {
        throw new AppError(`Product with id ${product.id} not found!`, 404);
      }

      const budgetProduct = {
        budget_id: createdBudgetId,
        product_id: product.id,
        quantity: product.quantity,
        unit_price: product.unit_price,
        discount: product.discount,
        total_price: calculateProductTotalPrice(product),
      };

      await this.budgetProductsRepository.save(budgetProduct);
    }
  }

  private async addAdditionalItem(budget: IBudget, createdBudgetId: string) {
    for (const additional_item of budget.additional_items) {
      const additionalItemExists =
        await this.additionalItemsRepository.findById(additional_item.id);

      if (!additionalItemExists) {
        throw new AppError(
          `Additional item with id ${additionalItemExists.id} not found!`,
          404
        );
      }

      const budgetAdditionalItems = {
        budget_id: createdBudgetId,
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
