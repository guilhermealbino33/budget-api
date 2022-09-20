/* eslint-disable no-unneeded-ternary */
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
export default class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, { name, email, password }: UpdateUserRequest) {
    if (!isValidId(id)) {
      throw new AppError('Invalid id!', 400);
    }

    const userToUpdate = await this.usersRepository.findById(id);

    if (!userToUpdate) {
      throw new AppError('User not found!', 404);
    }

    let data = {};

    if (name) {
      data = { ...data, name };
    }

    if (email) {
      data = { ...data, email };
    }

    if (!password) {
      const hashPassword = await hash(password, 8);
      data = { ...data, hashPassword };
    }

    return this.usersRepository.update(id, data);
  }
}
