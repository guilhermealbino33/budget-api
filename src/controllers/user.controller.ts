import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../shared/errors/AppError';

import { ProfileMap } from '../modules/users/mappers/ProfileMap';
import { AuthenticateUserUseCase } from '../modules/users/useCases/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../modules/users/useCases/CreateUserUseCase';
import { ShowUserProfileUseCase } from '../modules/users/useCases/ShowUserProfileUseCase';

// CONFERIR O TIPO DE RETORNO

export async function createUserHandler(request: Request, response: Response) {
  const { name, email, password } = request.body;
  const createUser = container.resolve(CreateUserUseCase);
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.status(201).json(user);
}

export async function showUserProfileHandler(
  request: Request,
  response: Response
) {
  const userId = request.body.user.id;
  const showUserProfile = container.resolve(ShowUserProfileUseCase);
  const user = await showUserProfile.execute(userId);
  const profileDTO = ProfileMap.toDTO(user);

  return response.json(profileDTO);
}

export async function authenticateUserHandler(
  request: Request,
  response: Response
) {
  try {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserUseCase);
    const { user, token } = await authenticateUser.execute(email, password);

    return response.json({ user, token });
  } catch (error) {
    console.log(error);

    return response
      .status(401)
      .json(new AppError('Incorrect e-mail or password', 401));
  }
}
