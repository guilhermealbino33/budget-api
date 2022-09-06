import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionUserUseCase from '../useCases/createSession.useCase';
import { RefreshTokenUseCase } from '../useCases/refreshToken.useCase';

export async function createSessionHandler(
  request: Request,
  response: Response
): Promise<Response> {
  const { password, email } = request.body;
  const createSessionUseCase = container.resolve(CreateSessionUserUseCase);
  const token = await createSessionUseCase.execute({
    password,
    email,
  });

  return response.json(token);
}

export async function refreshTokenHandler(
  request: Request,
  response: Response
): Promise<Response> {
  const token =
    request.body.token ||
    request.headers['x-access-token'] ||
    request.query.token;

  const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
  const refresh_token = await refreshTokenUseCase.execute(token);

  return response.json(refresh_token);
}
