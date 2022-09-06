import { NextFunction, Request, Response } from 'express';
import UsersRepository from '../../modules/users/repositories/implementations/usersRepository';
import { AppError } from '../errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError("User isn't admin!", 403);
  }

  return next();
}
