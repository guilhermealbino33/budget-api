import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdditionalItemsUseCase from '../useCases/createAdditionalItems.useCase';
import DeleteAdditionalItemsUseCase from '../useCases/deleteAdditionalItems.useCase';
import ShowAdditionalItemsUseCase from '../useCases/showAdditionalItems.useCase';
import UpdateAdditionalItemsUseCase from '../useCases/updateAdditionalItems.useCase';

export async function createAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { code, name, list_price, description } = request.body;

  const createAdditionalItemsUseCase = container.resolve(
    CreateAdditionalItemsUseCase
  );
  const additionalItems = await createAdditionalItemsUseCase.execute({
    code,
    name,
    list_price,
    description,
  });

  return response.status(201).json(additionalItems);
}

export async function updateAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const { code, name, list_price, description } = request.body;

  const updateAdditionalItemsUseCase = container.resolve(
    UpdateAdditionalItemsUseCase
  );
  const additionalItems = await updateAdditionalItemsUseCase.execute(id, {
    code,
    name,
    list_price,
    description,
  });

  return response.status(200).json(additionalItems);
}

export async function deleteAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteAdditionalItemsUseCase = container.resolve(
    DeleteAdditionalItemsUseCase
  );
  await deleteAdditionalItemsUseCase.execute(id);

  return response.status(204).send();
}

export async function showAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const name = request.query.name as string;
  const page = request.query.page as string;
  const limit = request.query.limit as string;

  const showAdditionalItemsUseCase = container.resolve(
    ShowAdditionalItemsUseCase
  );
  const item = await showAdditionalItemsUseCase.execute(
    page ? parseInt(page, 10) : 1,
    limit ? parseInt(limit, 10) : 5,
    id,
    name
  );

  return response.status(200).json(item);
}
