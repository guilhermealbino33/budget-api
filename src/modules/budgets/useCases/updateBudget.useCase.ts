/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { Budget, IBudget } from '../../../entities/budget';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import { calculateTotalValue } from '../utils/calculateTotalValue';
import { IUpdateBudgetAdditionalItemsService } from '../services/IUpdateBudgetAdditionalItemsService';
import { IUpdateBudgetProductsService } from '../services/IUpdateBudgetProductsService';

@injectable()
export default class UpdateBudgetUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('UpdateBudgetProductsService')
    private updateBudgetProductsService: IUpdateBudgetProductsService,
    @inject('UpdateBudgetAdditionalItemsService')
    private updateBudgetAdditionalItemsService: IUpdateBudgetAdditionalItemsService
  ) {}

  async execute(
    id: string,
    {
      code,
      customer_id,
      products,
      salesman_id,
      delivery_type,
      delivery_value,
      observations,
      additional_items,
      total_value,
    }: IBudget
  ) {
    let data = {};

    if (!isValidId(id)) {
      throw new AppError('Invalid budget id!', 400);
    }

    const budgetToUpdate = await this.budgetsRepository.findById(id);

    if (budgetToUpdate.closed) {
      throw new AppError('Can not update a closed budget!', 400);
    }

    if (!budgetToUpdate) {
      throw new AppError('Budget not found!', 404);
    }

    if (code) {
      data = { ...data, code };
    }

    if (customer_id) {
      data = { ...data, customer_id };
    }

    if (customer_id) {
      data = { ...data, customer_id };
    }

    if (products) {
      await this.updateBudgetProductsService.execute(products, budgetToUpdate);
    }

    if (salesman_id) {
      data = { ...data, salesman_id };
    }

    if (delivery_type) {
      data = { ...data, delivery_type };
    }

    if (delivery_value) {
      data = { ...data, delivery_value };
    }

    if (observations) {
      data = { ...data, observations };
    }

    if (additional_items) {
      await this.updateBudgetAdditionalItemsService.execute(
        additional_items,
        budgetToUpdate
      );
    }

    if (products || additional_items || delivery_value) {
      total_value = await calculateTotalValue({
        products: products ? products : budgetToUpdate.products,
        additional_items: additional_items
          ? additional_items
          : budgetToUpdate.additional_items,
        delivery_value: delivery_value
          ? delivery_value
          : budgetToUpdate.delivery_value,
      } as Budget);

      data = { ...data, total_value };
    }

    return this.budgetsRepository.update(id, data);
  }
}
