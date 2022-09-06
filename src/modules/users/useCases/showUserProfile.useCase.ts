import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ProfileMap } from '../mappers/profileMap';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export default class ShowUserProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    return ProfileMap.toDTO(user);
  }
}
