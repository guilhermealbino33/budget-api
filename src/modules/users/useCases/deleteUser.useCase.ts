import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(userId: string) {
    if (!isValidId(userId)) {
      throw new AppError('Invalid id!', 400);
    }

    const userToDelete = await this.usersRepository.findById(userId);

    if (!userToDelete) {
      throw new AppError('User not found!', 404);
    }

    const tokensToDelete = await this.usersTokensRepository.findByUserId(
      userId
    );

    if (tokensToDelete || tokensToDelete.length) {
      for (const token of tokensToDelete) {
        await this.usersTokensRepository.deleteById(token.id);
      }
    }

    await this.usersRepository.delete(userToDelete.id);
  }
}
