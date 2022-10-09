import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ProfileMap } from '../mappers/profileMap';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export default class ShowUserProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(userId?: string) {
    const usersDto = [];

    if (userId) {
      if (!isValidId(userId)) {
        throw new AppError('Invalid id!', 400);
      }

      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new AppError('User not found!', 404);
      }

      return ProfileMap.toDTO(user);
    }

    const users = await this.usersRepository.list();

    if (!users.length) {
      throw new AppError('No users found!', 404);
    }

    for (const user of users) {
      usersDto.push(ProfileMap.toDTO(user));
    }

    return usersDto;
  }
}
