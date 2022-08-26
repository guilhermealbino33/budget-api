import { inject, injectable } from "tsyringe";
import AuthenticateUserService from "../services/authenticateUser.service";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("AuthenticateUserService")
    private authenticateUserService: AuthenticateUserService
  ) {}

  async execute(email: string, password: string) {
    return this.authenticateUserService.execute({ email, password });
  }
}
