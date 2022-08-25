import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { CreateUserError } from "../err/CreateUserError";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}
