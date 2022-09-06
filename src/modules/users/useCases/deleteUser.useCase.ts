import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string) {
    if (!isValidId(userId)) {
      throw new AppError('Invalid id!', 400);
    }

    const userToDelete = await this.usersRepository.findById(userId);

    if (!userToDelete) {
      throw new AppError('User not found!', 404);
    }

    await this.usersRepository.deleteUser(userId);
  }
}
