import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { CreateUserError } from "../err/CreateUserError";
import IUsersService from "../services/IUsersService";

@injectable()
export class CreateUserUseCase {
  constructor(@inject("UsersService") private usersService: IUsersService) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersService.findByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHash = await hash(password, 8);

    return this.usersService.createUser({
      name,
      email,
      password: passwordHash,
    });
  }
}

// Testar e verificar porque ele está passando um user descontruído ao invés de um user
