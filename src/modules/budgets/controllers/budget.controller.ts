import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBudgetUseCase from '../useCases/createBudget.useCase';
import DeleteBudgetUseCase from '../useCases/deleteBudget.useCase';
import ShowBudgetUseCase from '../useCases/showBudget.useCase';
import UpdateBudgetUseCase from '../useCases/updateBudget.useCase';

export async function createBudgetHandler(
  request: Request,
  response: Response
) {
  const {
    code,
    customer,
    products,
    salesman,
    quantity,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
  } = request.body;
  const createBudgetUseCase = container.resolve(CreateBudgetUseCase);
  const budget = await createBudgetUseCase.execute({
    code,
    customer,
    products,
    salesman,
    quantity,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
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

// export async function convertToPdfHandler(
//   request: Request,
//   response: Response
// ) {}
