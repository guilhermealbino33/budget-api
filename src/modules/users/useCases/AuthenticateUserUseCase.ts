import { inject, injectable } from "tsyringe";
import IUsersService from "../services/IUsersService";

@injectable()
export class AuthenticateUserUseCase {
  constructor(@inject("UsersService") private usersService: IUsersService) {}

  async execute(email: string, password: string) {
    return this.usersService.authenticateUser({ email, password });
  }
}
