/* eslint-disable no-unneeded-ternary */
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../../../entities/user';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export default class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(
    id: string,
    { name, email, role, is_admin, is_salesman, salesman_id, password }: IUser
  ) {
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

    if (role) {
      if (role === 'admin') {
        is_admin = true;
        data = { ...data, role, is_admin };
      } else if (role === 'salesman') {
        is_admin = false;
        is_salesman = true;
        data = { ...data, role, is_admin, is_salesman };
      } else {
        is_admin = false;
        data = { ...data, role, is_admin };
      }

      if (is_salesman && !salesman_id) {
        throw new AppError('Salesman user must have a salesman id!', 400);
      }
    }

    if (password) {
      const hashPassword = await hash(password, 8);
      data = { ...data, password: hashPassword };
    }

    return this.usersRepository.update(id, data);
  }
}
