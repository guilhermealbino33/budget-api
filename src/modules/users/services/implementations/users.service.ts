import { inject } from "tsyringe";
import { IAuthenticateUserResponseDTO } from "../../dtos/IAuthenticateUserResponseDTO";
import { IncorrectEmailOrPasswordError } from "../../err/IncorrectEmailOrPasswordError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import IUsersService from "../IUsersService";
import { sign } from "jsonwebtoken";
import authConfig from "../../../../config/auth";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserError } from "../../err/CreateUserError";
import { hash } from "bcryptjs";
import { ShowUserProfileError } from "../../err/ShowUserProfileError";
import { User } from "../../../../entities/User";

interface IRequest {
  email: string;
  password: string;
}

export default class UsersService implements IUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async createUser({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      email,
      name,
      password,
    });

    return user;
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.usersRepository.findById(userId);
  }

  async findByEmail(userId: string): Promise<User | undefined> {
    return this.usersRepository.findById(userId);
  }

  async authenticateUser({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    if (password !== user.password) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ user }, String(secret), {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
