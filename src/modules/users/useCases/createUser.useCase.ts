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
    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 403);
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
