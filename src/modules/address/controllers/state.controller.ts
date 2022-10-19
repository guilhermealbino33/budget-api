import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListStatesUseCase from '../useCases/listStates.useCase';

export async function listStatesHandler(request: Request, response: Response) {
  const listStatesUseCase = container.resolve(ListStatesUseCase);
  const category = await listStatesUseCase.execute();

  return response.status(200).json(category);
}
