import { inject } from "tsyringe";
import { ShowUserProfileError } from "../err/ShowUserProfileError";
import { IUsersRepository } from "../repositories/IUsersRepository";

export default class ShowUserProfileService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ShowUserProfileError();
    }

    return user;
  }
}
