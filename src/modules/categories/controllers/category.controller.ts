import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryUseCase from '../useCases/createCategory.useCase';
import DeleteCategoryUseCase from '../useCases/deleteCategory.useCase';
import ShowCategoriesUseCase from '../useCases/showCategories.useCase';
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

  return response.status(204).send();
}

export async function showCategoriesHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const name = request.query.name as string;
  const page = request.query.page as string;
  const limit = request.query.limit as string;

  const showCategoriesUseCase = container.resolve(ShowCategoriesUseCase);
  const categories = await showCategoriesUseCase.execute(
    page ? parseInt(page, 10) : 1,
    limit ? parseInt(limit, 10) : 5,
    id,
    name
  );

  return response.status(200).json(categories);
}
