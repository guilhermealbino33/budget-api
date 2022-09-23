import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBudgetUseCase from '../useCases/createBudget.useCase';
import DeleteBudgetUseCase from '../useCases/deleteBudget.useCase';
import ShowBudgetsUseCase from '../useCases/showBudgets.useCase';
// import UpdateBudgetUseCase from '../useCases/updateBudget.useCase';

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

// export async function updateBudgetHandler(
//   request: Request,
//   response: Response
// ) {
//   const { id } = request.params;

//   const {
//     code,
//     customer_id,
//     products_id,
//     salesman_id,
//     quantity,
//     delivery_type,
//     delivery_value,
//     observations,
//     additional_items_id,
//   } = request.body;

//   const updateBudgetUseCase = container.resolve(UpdateBudgetUseCase);
//   const budget = await updateBudgetUseCase.execute(id, {
//     code,
//     customer_id,
//     products_id,
//     salesman_id,
//     quantity,
//     delivery_type,
//     delivery_value,
//     observations,
//     additional_items_id,
//   });

//   return response.status(200).json(budget);
// }

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
  const showBudgetsUseCase = container.resolve(ShowBudgetsUseCase);
  const budgets = await showBudgetsUseCase.execute(id);

  return response.status(200).json(budgets);
}

// export async function convertToPdfHandler(
//   request: Request,
//   response: Response
// ) {}

// export async function closeBudgetHandler(
//   request: Request,
//   response: Response
// ) {}
