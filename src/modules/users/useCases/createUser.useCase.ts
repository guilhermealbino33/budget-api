import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../../../entities/user';
import { AppError } from '../../../shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
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
    } else {
      user.is_admin = false;
    }

    await this.usersRepository.create(user);
  }
}
