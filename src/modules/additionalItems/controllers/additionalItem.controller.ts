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
  const { code, name, value } = request.body;

  const createAdditionalItemsUseCase = container.resolve(
    CreateAdditionalItemsUseCase
  );
  const additionalItems = await createAdditionalItemsUseCase.execute({
    code,
    name,
    value,
  });

  return response.status(201).json(additionalItems);
}

export async function updateAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const { code, name, value } = request.body;

  const updateAdditionalItemsUseCase = container.resolve(
    UpdateAdditionalItemsUseCase
  );
  const additionalItems = await updateAdditionalItemsUseCase.execute(id, {
    code,
    name,
    value,
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

  return response.status(204);
}

export async function showAdditionalItemsHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const showAdditionalItemsUseCase = container.resolve(
    ShowAdditionalItemsUseCase
  );
  const additionalItems = await showAdditionalItemsUseCase.execute(id);

  return response.status(200).json(additionalItems);
}
