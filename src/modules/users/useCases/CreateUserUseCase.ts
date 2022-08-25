import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { CreateUserError } from "../err/CreateUserError";
import { CreateUserService } from "../services/createUser.service";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("CreateUserService") private createUserService: CreateUserService
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    this.createUserService.execute({ name, email, password });
  }
}

// Testar e verificar porque ele está passando um user descontruído ao invés de um user
