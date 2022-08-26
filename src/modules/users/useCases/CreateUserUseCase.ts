import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { CreateUserService } from "../services/createUser.service";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("CreateUserService") private createUserService: CreateUserService
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    return this.createUserService.execute({ name, email, password });
  }
}

// Testar e verificar porque ele está passando um user descontruído ao invés de um user
