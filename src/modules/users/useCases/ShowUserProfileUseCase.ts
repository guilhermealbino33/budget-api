import { inject, injectable } from "tsyringe";
import { ShowUserProfileError } from "../err/ShowUserProfileError";
import IUsersService from "../services/IUsersService";

@injectable()
export class ShowUserProfileUseCase {
  constructor(@inject("UsersService") private usersService: IUsersService) {}

  async execute(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new ShowUserProfileError();
    }

    return user;
  }
}
