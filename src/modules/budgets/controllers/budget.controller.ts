import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBudgetUseCase from '../useCases/createBudget.useCase';
import CreateBudgetAdditionalItemsUseCase from '../useCases/createBudgetAdditionaltems.useCase';
import CreateBudgetProductsUseCase from '../useCases/createBudgetProducts.useCase';
import DeleteBudgetUseCase from '../useCases/deleteBudget.useCase';
import ShowBudgetUseCase from '../useCases/showBudget.useCase';
import UpdateBudgetUseCase from '../useCases/updateBudget.useCase';

export async function createBudgetHandler(
  request: Request,
  response: Response
) {
  const {
    code,
    customer_id,
    products,
    salesman_id,
    quantity,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
    total_value,
  } = request.body;

  const createBudgetUseCase = container.resolve(CreateBudgetUseCase);
  const budget = await createBudgetUseCase.execute({
    code,
    customer_id,
    products,
    salesman_id,
    quantity,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
    total_value,
  });

  return response.status(201).json(budget);
}

export async function updateBudgetHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const {
    code,
    customer_id,
    product_id,
    salesman_id,
    quantity,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
  } = request.body;

  const updateBudgetUseCase = container.resolve(UpdateBudgetUseCase);
  const budget = await updateBudgetUseCase.execute(id, {
    code,
    customer_id,
    product_id,
    salesman_id,
    quantity,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
  });

  return response.status(200).json(budget);
}

export async function deleteBudgetHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteBudgetUseCase = container.resolve(DeleteBudgetUseCase);
  await deleteBudgetUseCase.execute(id);

  return response.status(204);
}

export async function showBudgetHandler(request: Request, response: Response) {
  const { id } = request.params;
  const showBudgetUseCase = container.resolve(ShowBudgetUseCase);
  const budget = await showBudgetUseCase.execute(id);

  return response.status(200).json(budget);
}

export async function createBudgetProductsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const { product_ids } = request.body;

  const createBudgetProductsUseCase = container.resolve(
    CreateBudgetProductsUseCase
  );
  const budget = await createBudgetProductsUseCase.execute({
    budget_id: id,
    product_ids,
  });

  return response.status(200).json(budget);
}

export async function createBudgetAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const { additional_items_ids } = request.body;

  const createBudgetAdditionalItemsUseCase = container.resolve(
    CreateBudgetAdditionalItemsUseCase
  );
  const budget = await createBudgetAdditionalItemsUseCase.execute({
    budget_id: id,
    additional_items_ids,
  });

  return response.status(200).json(budget);
}

// export async function convertToPdfHandler(
//   request: Request,
//   response: Response
// ) {}
