import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConvertToPdfUseCase from '../useCases/convertToPdf.useCase';
import CountBudgetsUseCase from '../useCases/countBudgets.useCase';
import CountSalesBudgetsUseCase from '../useCases/countSalesBudget.useCase';
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
    status,
    customer_id,
    salesman_id,
    delivery_type,
    delivery_value,
    delivery_date,
    observations,
    payment_conditions,
    proposal_validity,
    products,
    additional_items,
  } = request.body;

  const closed = false;

  const createBudgetUseCase = container.resolve(CreateBudgetUseCase);
  const budget = await createBudgetUseCase.execute({
    code,
    status,
    customer_id,
    salesman_id,
    delivery_type,
    delivery_value,
    delivery_date,
    observations,
    payment_conditions,
    proposal_validity,
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
    status,
    customer_id,
    products,
    salesman_id,
    delivery_type,
    delivery_value,
    delivery_date,
    observations,
    payment_conditions,
    proposal_validity,
    additional_items,
  } = request.body;

  const updateBudgetUseCase = container.resolve(UpdateBudgetUseCase);
  const budget = await updateBudgetUseCase.execute(id, {
    code,
    status,
    customer_id,
    products,
    salesman_id,
    delivery_type,
    delivery_value,
    delivery_date,
    observations,
    payment_conditions,
    proposal_validity,
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
  const page = request.query.page as string;
  const limit = request.query.limit as string;

  const showBudgetsUseCase = container.resolve(ShowBudgetsUseCase);
  const budgets = await showBudgetsUseCase.execute(
    page ? parseInt(page, 10) : 1,
    limit ? parseInt(limit, 10) : 5,
    id
  );

  return response.status(200).json(budgets);
}

export async function convertToPdfHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const convertToPdfUseCase = container.resolve(ConvertToPdfUseCase);
  const pdfPath = await convertToPdfUseCase.execute(id);

  return response.status(200).download(pdfPath);
}

export async function countBudgetsHandler(
  request: Request,
  response: Response
) {
  const countBudgetsUseCase = container.resolve(CountBudgetsUseCase);
  const budgetsCount = await countBudgetsUseCase.execute();

  return response.status(200).json(budgetsCount);
}

export async function countSalesBudgetsHandler(
  request: Request,
  response: Response
) {
  const countSalesBudgetsUseCase = container.resolve(CountSalesBudgetsUseCase);
  const budgetsCount = await countSalesBudgetsUseCase.execute();

  return response.status(200).json(budgetsCount);
}
