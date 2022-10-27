import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from '../useCases/createUser.useCase';
import DeleteUserUseCase from '../useCases/deleteUser.useCase';
import ShowUserProfileUseCase from '../useCases/showUserProfile.useCase';
import UpdateUserUseCase from '../useCases/updateUser.useCase';

export async function createUserHandler(request: Request, response: Response) {
  const { name, email, role, password, is_admin } = request.body;
  const createUserUseCase = container.resolve(CreateUserUseCase);
  const user = await createUserUseCase.execute({
    name,
    email,
    role,
    password,
    is_admin,
  });

  return response.status(201).json(user);
}

export async function updateUserHandler(request: Request, response: Response) {
  const { id } = request.params;

  const { name, email, role, password } = request.body;

  const updateUserUseCase = container.resolve(UpdateUserUseCase);
  const user = await updateUserUseCase.execute(id, {
    name,
    email,
    role,
    password,
  });

  return response.status(200).json(user);
}

export async function deleteUserHandler(request: Request, response: Response) {
  const { id } = request.params;
  const deleteUserUseCase = container.resolve(DeleteUserUseCase);
  await deleteUserUseCase.execute(id);

  return response.status(204).send();
}

export async function showUserHandler(request: Request, response: Response) {
  const { id } = request.params;
  const showUserProfile = container.resolve(ShowUserProfileUseCase);
  const user = await showUserProfile.execute(id);

  return response.status(200).json(user);
}
