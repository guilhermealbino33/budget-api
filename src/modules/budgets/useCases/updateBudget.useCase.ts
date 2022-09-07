/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';

interface UpdateBudgetRequest {
  code?: string;
  customer_id?: string;
  budget_id?: string;
  product_id?: string;
  salesman_id?: string;
  quantity?: number;
  delivery_type?: string;
  delivery_value?: string;
  observations?: string;
  additional_items?: string;
  updated_at?: Date;
}

@injectable()
export default class UpdateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository
  ) {}

  async execute(
    id: string,
    {
      code,
      customer_id,
      product_id,
      salesman_id,
      quantity,
      delivery_type,
      delivery_value,
      observations,
      additional_items,
    }: UpdateBudgetRequest
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid budget id!', 400);
    }

    const budgetToUpdate = await this.budgetsRepository.findById(id);

    if (!budgetToUpdate) {
      throw new AppError('Budget not found!', 404);
    }

    budgetToUpdate.code = code ? code : budgetToUpdate.code;
    budgetToUpdate.customer_id = customer_id
      ? customer_id
      : budgetToUpdate.customer_id;
    budgetToUpdate.product_id = product_id
      ? product_id
      : budgetToUpdate.product_id;
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
    budgetToUpdate.additional_items = additional_items
      ? additional_items
      : budgetToUpdate.additional_items;

    budgetToUpdate.updated_at = new Date();

    return this.budgetsRepository.updateBudget(budgetToUpdate);
  }
}
