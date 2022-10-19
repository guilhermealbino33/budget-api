import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCitiesUseCase from '../useCases/listCities.useCase';
import ListCitiesByStateCodeUseCase from '../useCases/listCitiesByStateCode.useCase';

export async function listCitiesHandler(request: Request, response: Response) {
  const { code } = request.params;
  const listCitiesUseCase = container.resolve(ListCitiesUseCase);
  const category = await listCitiesUseCase.execute(code);

  return response.status(200).json(category);
}

export async function listCitiesByStateCodeHandler(
  request: Request,
  response: Response
) {
  const { state_code } = request.params;
  const listCitiesByStateCodeUseCase = container.resolve(
    ListCitiesByStateCodeUseCase
  );
  const category = await listCitiesByStateCodeUseCase.execute(state_code);

  return response.status(200).json(category);
}
