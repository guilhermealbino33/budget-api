import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConvertToPdfUseCase from '../useCases/convertToPdf.useCase';
import CreateBudgetUseCase from '../useCases/createBudget.useCase';
import DeleteBudgetUseCase from '../useCases/deleteBudget.useCase';
import OpenCloseBudgetUseCase from '../useCases/openCloseBudget.useCase';
import ShowBudgetsUseCase from '../useCases/showBudgets.useCase';
import UpdateBudgetUseCase from '../useCases/updateBudget.useCase';

export async function createBudgetHandler(
  request: Request,
  response: Response
) {
  const {
    code,
    customer_id,
    salesman_id,
    delivery_type,
    delivery_value,
    observations,
    products,
    additional_items,
  } = request.body;

  const closed = false;

  const createBudgetUseCase = container.resolve(CreateBudgetUseCase);
  const budget = await createBudgetUseCase.execute({
    code,
    customer_id,
    salesman_id,
    delivery_type,
    delivery_value,
    observations,
    closed,
    products,
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
    products,
    salesman_id,
    delivery_type,
    delivery_value,
    observations,
    additional_items,
  } = request.body;

  const updateBudgetUseCase = container.resolve(UpdateBudgetUseCase);
  const budget = await updateBudgetUseCase.execute(id, {
    code,
    customer_id,
    products,
    salesman_id,
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

  return response.status(204).send();
}

export async function openCloseBudgetHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const openCloseBudgetUseCase = container.resolve(OpenCloseBudgetUseCase);
  await openCloseBudgetUseCase.execute(id);

  return response.status(200).send();
}

export async function showBudgetHandler(request: Request, response: Response) {
  const { id } = request.params;
  const showBudgetsUseCase = container.resolve(ShowBudgetsUseCase);
  const budgets = await showBudgetsUseCase.execute(id);

  return response.status(200).json(budgets);
}

export async function convertToPdfHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const convertToPdfUseCase = container.resolve(ConvertToPdfUseCase);
  await convertToPdfUseCase.execute(id);

  return response.status(200).send();
}
