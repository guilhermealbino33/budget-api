import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryUseCase from '../useCases/createCategory.useCase';
import DeleteCategoryUseCase from '../useCases/deleteCategory.useCase';
import ShowCategoryUseCase from '../useCases/showCategory.useCase';
import UpdateCategoryUseCase from '../useCases/updateCategory.useCase';

export async function createCategoryHandler(
  request: Request,
  response: Response
) {
  const { name, description } = request.body;
  const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
  const category = await createCategoryUseCase.execute({ name, description });

  return response.status(201).json(category);
}

export async function updateCategoryHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const { name, description } = request.body;

  const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);
  const category = await updateCategoryUseCase.execute(id, {
    name,
    description,
  });

  return response.status(200).json(category);
}

export async function deleteCategoryHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
  await deleteCategoryUseCase.execute(id);

  return response.status(204);
}

export async function showCategoryHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const showCategoryUseCase = container.resolve(ShowCategoryUseCase);
  const category = await showCategoryUseCase.execute(id);

  return response.status(200).json(category);
}
