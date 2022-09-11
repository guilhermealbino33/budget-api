/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import { calculateTotalValue } from '../services/calculateTotalValue';

interface UpdateBudgetRequest {
  code?: string;
  customer_id?: string;
  budget_id?: string;
  products_id?: string[];
  salesman_id?: string;
  quantity?: number;
  delivery_type?: string;
  delivery_value?: string;
  observations?: string;
  additional_items_id?: string[];
  updated_at?: Date;
}

@injectable()
export default class UpdateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    private productsRepository: IProductsRepository,
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(
    id: string,
    {
      code,
      customer_id,
      products_id,
      salesman_id,
      quantity,
      delivery_type,
      delivery_value,
      observations,
      additional_items_id,
    }: UpdateBudgetRequest
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid budget id!', 400);
    }

    const budgetToUpdate = await this.budgetsRepository.findById(id);

    if (!budgetToUpdate) {
      throw new AppError('Budget not found!', 404);
    }

    const products = await this.productsRepository.findByIds(products_id);

    if (!products) {
      throw new AppError('Budget must have at least one product!', 400);
    } else {
      budgetToUpdate.products = products;
    }

    const additionalItems = await this.additionalItemsRepository.findByIds(
      additional_items_id
    );

    if (additionalItems) {
      budgetToUpdate.additional_items = additionalItems;
    }

    budgetToUpdate.total_value = await calculateTotalValue(
      budgetToUpdate.products,
      budgetToUpdate.additional_items
    );

    budgetToUpdate.code = code ? code : budgetToUpdate.code;
    budgetToUpdate.customer_id = customer_id
      ? customer_id
      : budgetToUpdate.customer_id;
    budgetToUpdate.products = products ? products : budgetToUpdate.products;
    budgetToUpdate.salesman_id = salesman_id
      ? salesman_id
      : budgetToUpdate.salesman_id;
    budgetToUpdate.quantity = quantity ? quantity : budgetToUpdate.quantity;
    budgetToUpdate.delivery_type = delivery_type
      ? delivery_type
      : budgetToUpdate.delivery_type;
    budgetToUpdate.delivery_value = delivery_value
      ? delivery_value
      : budgetToUpdate.delivery_value;
    budgetToUpdate.observations = observations
      ? observations
      : budgetToUpdate.observations;
    budgetToUpdate.additional_items = additionalItems
      ? additionalItems
      : budgetToUpdate.additional_items;

    budgetToUpdate.updated_at = new Date();

    return this.budgetsRepository.updateBudget(budgetToUpdate);
  }
}
