import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../../../entities/user';
import { AppError } from '../../../shared/errors/AppError';
import { ISalesmenRepository } from '../../salesmen/repositories/ISalesmenRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository
  ) {}

  async execute(user: IUser) {
    if (!user.email) {
      throw new AppError('User must have an e-mail!', 400);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 409);
    }

    if (!user.name) {
      throw new AppError('User must have a name!', 400);
    }

    if (!user.password) {
      throw new AppError('User must have a password!', 400);
    }

    if (!user.role) {
      throw new AppError('User must have a role!', 400);
    }

    user.password = await hash(user.password, 8);

    if (user.role === 'admin') {
      user.is_admin = true;
      user.is_salesman = false;
    } else if (user.role === 'salesman') {
      user.is_admin = false;
      user.is_salesman = true;
    } else {
      user.is_admin = false;
      user.is_salesman = false;
    }

    if (user.is_salesman && !user.salesman_id) {
      throw new AppError('Salesman user must have a salesman id!', 400);
    }

    if (user.salesman_id) {
      const salesmenExists = await this.salesmenRepository.findById(
        user.salesman_id
      );

      if (!salesmenExists) {
        throw new AppError('Salesman not found!', 404);
      }

      user.name = salesmenExists.name;
    }

    await this.usersRepository.create(user);
  }
}
