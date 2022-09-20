import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { IBudget } from '../../../entities/budget';
import { IBudgetProducts } from '../../../entities/budgetProducts';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IBudgetProductsRepository } from '../repositories/IBudgetProductsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import {
  calculateProductTotalPrice,
  calculateTotalValue,
} from '../services/calculateTotalValue';

interface ICreateBudget extends IBudget {
  products: IBudgetProducts[];
  additional_items_id: string[];
}

@injectable()
export default class CreateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('BudgetProductsRepository')
    private budgetProductsRepository: IBudgetProductsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(budget: ICreateBudget) {
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

    for (const product of budget.products) {
      const productExists = await this.productsRepository.findById(product.id);

      if (!productExists) {
        throw new AppError(`Product with id ${product.id} not found!`, 404);
      }

      const budgetProduct = {
        product_id: product.id,
        quantity: product.quantity,
        unit_price: product.unit_price,
        discount: product.discount,
        total_price: calculateProductTotalPrice(product),
      };

      await this.budgetProductsRepository.saveProduct(budgetProduct);
    }

    const additionalItems = await this.additionalItemsRepository.findByIds(
      budget.additional_items_id
    );

    if (additionalItems) {
      budget.additional_items = additionalItems;
    }

    budget.total_value = await calculateTotalValue(budget);

    await this.budgetsRepository.create(budget);
    console.log('budget.id', budget.id); // se tira o console ele executa o saveBudget antes do create
    await this.budgetProductsRepository.saveBudgetId(budget.id);
  }
}
